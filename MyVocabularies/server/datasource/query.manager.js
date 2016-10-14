'use strict';

let _ = require('lodash');
let fs = require('fs');
let path = require('path');
let mysql = require('mysql');

let queryCache = {
    GetAllSentence: {
        text: 'select sentence from example;'
    },
    GetARandomPhrase: {
        text: 'set @id=(SELECT phrase_id FROM phrase ORDER BY RAND() LIMIT 1);SELECT * FROM phrase where phrase_id=@id;select sentence from example where phrase_id=@id;'
    },
    InsertSentence: {
        text: 'insert example (phrase_id,sentence,last_update_timestamp) values (@phraseId,@sentence,now());'
    },
    GetAllPhrases: {
        text: "SELECT *, DATE_FORMAT(last_update_timestamp,'%Y-%m-%d') AS update_time FROM phrase;"
    }
};

class QueryManager {
    constructor(connString) {
        this.queries = queryCache;
        this.connectionPool = mysql.createPool(connString);
        this.connectionPool.config.queryTimeout = connString.options.requestTimeout;
        this.connectionPool.config.connectionConfig.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\@(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };

        _.forEach(queryCache, function (item) {
            if (item.source) {
                item.text = fs.readFileSync(path.join(__dirname, item.source), 'utf8');
            }
            else if (!item.text) {
                _.forEach(item, function (subItem) {
                    subItem.text = fs.readFileSync(path.join(__dirname, subItem.source), 'utf8');
                });
            }
        });
    }

    executor(query, parameters, preQueryBindings) {
        return new Promise((resolve, reject) => {
            process.nextTick(() => {
                let queryText = query.text;
                if (!_.isUndefined(query.binding) && !_.isNull(query.binding)) {
                    _.each(Object.keys(query.binding), (bindKey) => {
                        let bindValue = preQueryBindings[bindKey];
                        if (bindKey === 'dbName') {
                            bindValue = '`' + preQueryBindings[bindKey] + '`';
                        }
                        queryText = queryText.replace(new RegExp(query.binding[bindKey].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'gm'), bindValue);
                    });
                }
                let parameterString = queryText + '\r\n' + 'SQL Parameters:' + JSON.stringify(parameters);
                this.connectionPool.getConnection((err, connection) => {
                    if (err) {
                        console.log('Error: %s', err.toString());
                        return reject(err);
                    }

                    connection.query({
                        sql: queryText,
                        values: parameters,
                        timeout: this.connectionPool.config.queryTimeout
                    }, (err, rows, fields) => {
                        connection.release();
                        if (err) {
                            console.log('Error: %s', err.toString());
                        }
                        resolve(rows);
                    });
                });
            });
        });
    }
}

module.exports = QueryManager;