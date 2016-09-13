var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');

var executionInProgress = false;
var workQueue = [];
var connectionString;

var queryCache = {
    GetARandomPhrase: {
        text: 'SELECT * FROM phrase ORDER BY RAND() LIMIT 1;'
    },
    InsertSentence:{
        text:'insert example (phrase_id,sentence,last_update_timestamp) values (@phraseId,@sentence,now());'
    }
};

function initCache(connString) {
    connectionPool = mysql.createPool(connString);
    connectionPool.config.queryTimeout = connString.options.requestTimeout;
    connectionPool.config.connectionConfig.queryFormat = function (query, values) {
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

function executor(query, parameters, preQueryBindings, callback) {
    workQueue.push({query: query, parameters: parameters, binding: preQueryBindings, callback: callback});

    executionSerializer();
}

function executionSerializer() { 
    executionInProgress = true;
    if (workQueue.length === 0) {
        executionInProgress = false;
        return;
    }

    process.nextTick(function () {
        var workBlock = workQueue.splice(0, 1);
        var queryText = workBlock[0].query.text;
        var parameters = workBlock[0].parameters;
        var callback = workBlock[0].callback;
        var query = workBlock[0].query;

        if (!_.isUndefined(query.binding) && !_.isNull(query.binding)) {
            _.each(Object.keys(query.binding), function (bindKey) {
                var bindValue = workBlock[0].binding[bindKey];
                if (bindKey === 'dbName') {
                    //CVF-729.   escaping database name to support hyphen in MRS-QA
                    bindValue = '`' + workBlock[0].binding[bindKey] + '`';
                }
                queryText = queryText.replace(new RegExp(query.binding[bindKey].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'gm'), bindValue);
            });
        }
        var parameterString = queryText + '\r\n' + 'SQL Parameters:' + JSON.stringify(parameters);
        connectionPool.getConnection(function (err, connection) {
            if (!_.isUndefined(err) && !_.isNull(err)) {
                console.log('Error: %s',err.toString());
                // executionSerializer();
                return callback(err);
            }

            connection.query({
                sql: queryText,
                values: parameters,
                timeout: connectionPool.config.queryTimeout
            }, function (err, rows, fields) {
                connection.release();
                // executionSerializer();
                if (!_.isUndefined(err) && !_.isNull(err)) {
                    console.log('Error: %s',err.toString());
                }
                return callback(err, rows, fields);
            });
        });
    });
}
exports.manager = {
    init: initCache,
    queries: queryCache,
    executor: executor,
    test:function (params) {
        return [1,2,3]
    }
};