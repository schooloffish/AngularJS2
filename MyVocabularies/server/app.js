'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();

let clientFolder = path.join(path.dirname(__dirname), 'client', 'dist');
console.log(clientFolder);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(clientFolder));

app.get('/', function (req, res) {
    res.send('hello,world!');
});

let Phrase = require('./rest/phrase.js');
let phrase = new Phrase();
let router = phrase.expressRouter();

app.use('/api/v1', router);

//handle 404, to fix angular2 router and express router conflicts
app.use('*', function (req, res) {
    res.sendFile('index.html', { root: clientFolder });
});


app.listen(3000, function (params) {
    console.log('Example app listening on port 3000..');
})