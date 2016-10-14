'use strict';

let _ = require('lodash');
let Dal = require('../datasource/Dal.js');
let express = require('express');

class Phrase {
    constructor() {
        this.dal = new Dal();
    }

    expressRouter() {
        let router = express.Router();

        router.get('/phrase', _.bind(this.getPhrases, this));
        router.get('/allphrases', _.bind(this.getAllPhrases, this));
        router.get('/allSentence', _.bind(this.getAllSentence, this));
        router.post('/phrase', _.bind(this.insertSentence, this));

        return router;
    }

    getAllSentence(req, res) {
        this.dal.getAllSentence().then((result) => {
            return res.status(200).json(result);
        }, (err) => {
            return res.sendStatus(500);
        });
    }

    getPhrases(req, res) {
        this.dal.getPhrase().then((result) => {
            return res.status(200).json(result);
        }, (err) => {
            return res.sendStatus(500);
        });
    }

    insertSentence(req, res) {
        this.dal.insertSentence(req.body).then((result) => {
            return res.status(200).json(result);
        }, (err) => {
            return res.sendStatus(500);
        });
    }

    getAllPhrases(req, res) {
        this.dal.getAllPhrases().then((result) => {
            return res.status(200).json(result);
        }, (err) => {
            return res.sendStatus(500);
        });
    }
}

module.exports = Phrase;
