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
    InsertWorkOrderHistoryWithoutComment: {
        text: 'INSERT INTO work_order_history (work_order_id,user_id,action,last_update_timestamp,screen_shot_key) VALUES ($workOrderId,$userId,$action,now(),$screenShotKey) RETURNING work_order_history_id;'
    },
    InsertWorkOrderHistoryWithComment: {
        text: 'INSERT INTO work_order_history (work_order_id,user_id,action,last_update_timestamp,comment,screen_shot_key) VALUES ($workOrderId,$userId,$action,now(),$comment,$screenShotKey) RETURNING work_order_history_id;'
    },
    InsertCommentHistory: {
        text: 'INSERT INTO work_order_history_comment_link (work_order_history_id,comment_id) VALUES ($workOrderHistoryId,$commentId);'
    },
    GetQcReasons: {
        text: 'SELECT qc_reason_id as id,description as description FROM qc_reason;'
    },
    GetComments: {
        text: 'SELECT c.comment_id as id, c.description, t.comment_type_name as type FROM comment c, comment_type t WHERE c.comment_type_id = t.comment_type_id;'
    },
    GetWorkOrderState: {
        text: 'SELECT  status_name, work_order_status_id FROM work_order_status;'
    },
    GetApproveComments: {
        text: 'SELECT approve_comment_id as id,description as description FROM approve_comment;'
    },
    GetCloseComments: {
        text: 'SELECT close_comment_id as id,description as description FROM close_comment;'
    },
    GetReopenComments: {
        text: 'SELECT reopen_comment_Id as id,description as description FROM reopen_comment;'
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