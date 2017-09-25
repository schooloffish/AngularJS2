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
        return Phrase.all().then(function (all) {
            return Promise.resolve(
                all.map((item) => {
                    return item.sentence;
                })
            );
        }).catch((err) => {
            return Promise.reject(err);
        });
    }

    getPhrase(id) {

        

        let query = null;
        let parameters = null;
        if (!id) {
            query = this.queryManager.queries.GetARandomPhrase;
        }
        else {
            query = this.queryManager.queries.GetPhrase;
            parameters = { id: id };
        }

        return this.queryManager.executor(query, parameters, null).then((rows) => {
            let phrase = rows[0][0];
            phrase.sentences = _.map(rows[1], 'sentence');
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