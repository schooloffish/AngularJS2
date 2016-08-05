var _ = require('lodash');
var util = require('util');
var manager = require('./query.manager.js').manager;

function getPhrase(callback) {
    manager.executor(manager.queries.GetARandomPhrase, null, null, function getPhraseQueryCompleted(err, rows, fields) {
        return callback(err, rows);
    });
}


module.exports = {
    getPhrase: getPhrase
}