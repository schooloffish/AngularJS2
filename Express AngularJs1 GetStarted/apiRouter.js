var express = require('express');
var app = express();
var apiRouter = express.Router();
var _ = require('lodash');

var phones = [
    { name: 'iPhone 6', price: 5999, id: 1, image: 'assets/images/iPhone6.jpg' },
    { name: 'iPhone 7', price: 8888, id: 2, image: 'assets/images/iPhone7.png' },
    { name: 'Le 2', price: 1099, id: 3, image: 'assets/images/l2.jpg' },
    { name: 'Xiaomi Note', price: 1199, id: 4, image: 'assets/images/xiaomi_note.jpg' },
];

apiRouter.get('/phones', function (req, res) {
    return res.json(phones);
});

apiRouter.get('/phone/:id', function (req, res) {
    var id = req.params.id;
    var phone = _.find(phones, { id: +id });
    return res.json(phone);
});

module.exports = apiRouter;