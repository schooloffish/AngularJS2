'use strict';

let _ = require('lodash');
let Dal = require('../datasource/Dal.js');
let Phrase = require('../db/Models').Phrase;
let Example = require('../db/Models').Example;
let express = require('express');

class Phrase {
    constructor() {
        this.dal = new Dal();
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
        Example.all().then((all) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.sendStatus(500);
        });
        // this.dal.getAllSentence().then((result) => {
        //     return res.status(200).json(result);
        // }, (err) => {
        //     return res.sendStatus(500);
        // });
    }

    getPhrases(req, res) {
        Phrase.findOne({
            where: {
                id: +req.params.id
            }
        }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.sendStatus(500);
        });
        // this.dal.getPhrase(+req.params.id).then((result) => {
        //     return res.status(200).json(result);
        // }, (err) => {
        //     return res.sendStatus(500);
        // });
    }

    insertSentence(req, res) {
        Example.sync({ force: true }).then(() => {
            Example.create({
                phraseId: req.body.phraseId,
                sentence: req.body.sentence
            })
        });
        // this.dal.insertSentence(req.body).then((result) => {
        //     return res.status(200).json(result);
        // }, (err) => {
        //     return res.sendStatus(500);
        // });
    }

    getAllPhrases(req, res) {
        Phrase.all((all) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.sendStatus(500);
        });
        // this.dal.getAllPhrases().then((result) => {
        //     return res.status(200).json(result);
        // }, (err) => {
        //     return res.sendStatus(500);
        // });
    }
}

module.exports = Phrase;
