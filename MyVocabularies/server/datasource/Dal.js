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

    getPhrase() {
        return new Promise((resolve, reject) => {
            this.queryManager.executor(this.queryManager.queries.GetARandomPhrase, null, null).then((rows) => {
                resolve(rows);
            }, (err) => {
                reject(err);
            });
        });
    }

    getAllPhrases() {
        return new Promise((resolve, reject) => {
            this.queryManager.executor(this.queryManager.queries.GetAllPhrases, null, null).then((rows) => {
                resolve(rows);
            }, (err) => {
                reject(err);
            });
        });
    }

    insertSentence(params) {
        return new Promise((resolve, reject) => {
            this.queryManager.executor(this.queryManager.queries.InsertSentence, {
                phraseId: params.phraseId,
                sentence: params.sentence
            }, null).then((rows) => {
                resolve(rows);
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = Dal;