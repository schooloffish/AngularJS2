var _ = require('lodash');
var util = require('util');
var manager = require('./query.manager.js').manager;

function getPhrase(callback) {
    manager.executor(manager.queries.GetARandomPhrase, null, null, function getPhraseQueryCompleted(err, rows, fields) {
        return callback(err, rows);
    });
}

function getAllPhrases(callback) {
    manager.executor(manager.queries.GetAllPhrases, null, null, function getAllPhrasesCompleted(err, rows, fields) {
        return callback(err, rows);
    });
}

function insertSentence(params, callback) {
    manager.executor(manager.queries.InsertSentence, {
        phraseId: params.phraseId,
        sentence: params.sentence
    }, null, function insertSentenceCompleted(err, rows, fields) {
        return callback(err, rows);
    });
}

module.exports = {
    getPhrase: getPhrase,
    insertSentence: insertSentence,
    getAllPhrases: getAllPhrases
}