'use strict';

let _ = require('lodash');
let util = require('util');
let QuerManager = require('./query.manager.js');

class Dal {
    constructor() {
        this.queryManager = new QuerManager({
            host: 'localhost',
            user: 'root',
            password: '123456',
            multipleStatements: true,
            database: 'MyVocabularies',
            options: {
                requestTimeout: 60
            }
        });
    }

    getAllSentence() {
        return this.queryManager.executor(this.queryManager.queries.GetAllSentence, null, null).then(rows => {
            return Promise.resolve(_.map(rows, 'sentence'));
        }, err => {
            return Promise.reject(err);
        });
    }

    getPhrase() {
        return this.queryManager.executor(this.queryManager.queries.GetARandomPhrase, null, null).then((rows) => {
            let phrase = rows[1][0];
            phrase.sentences = _.map(rows[2], 'sentence');
            return Promise.resolve(phrase);
        }, (err) => {
            return Promise.reject(err);
        });
    }

    getAllPhrases() {
        return this.queryManager.executor(this.queryManager.queries.GetAllPhrases, null, null).then((rows) => {
            return Promise.resolve(rows);
        }, (err) => {
            return Promise.reject(err);
        });
    }

    insertSentence(params) {
        return this.queryManager.executor(this.queryManager.queries.InsertSentence, {
            phraseId: params.phraseId,
            sentence: params.sentence
        }, null).then((rows) => {
            return Promise.resolve(rows);
        }, (err) => {
            return Promise.reject(err);
        });
    }
}

module.exports = Dal;