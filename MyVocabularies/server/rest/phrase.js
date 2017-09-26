'use strict';

let _ = require('lodash');
let PhraseModel = require('../db/Models').Phrase;
let ExampleModel = require('../db/Models').Example;
let express = require('express');

class Phrase {
    constructor() {
    }

    expressRouter() {
        let router = express.Router();

        router.get('/phrase/:id', _.bind(this.getPhrases, this));
        router.get('/allphrases', _.bind(this.getAllPhrases, this));
        router.get('/allSentence', _.bind(this.getAllSentence, this));
        router.post('/phrase', _.bind(this.insertSentence, this));

        return router;
    }

    getAllSentence(req, res) {
        ExampleModel.all().then((all) => {
            return res.status(200).json(all.map((item) => { return item.sentence; }));
        }).catch((err) => {
            return res.sendStatus(500);
        });
    }

    getPhrases(req, res) {
        let id = +req.params.id;
        let promise1 = Promise.resolve(id);
        if (!id) {
            promise1 = PhraseModel.count().then((count) => {
                let index = Math.floor(Math.random() * count - 1) + 0
                return Promise.resolve(index);
            });
        }

        promise1.then((id) => {
            return PhraseModel.findOne({
                where: {
                    id: id
                }
            });
        }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.sendStatus(500);
        });
    }

    insertSentence(req, res) {
        ExampleModel.sync({ force: true }).then(() => {
            ExampleModel.create({
                phraseId: req.body.phraseId,
                sentence: req.body.sentence
            })
        });
    }

    getAllPhrases(req, res) {
        PhraseModel.all().then((all) => {
            return res.status(200).json(all);
        }).catch((err) => {
            return res.sendStatus(500);
        });
    }
}

module.exports = Phrase;
