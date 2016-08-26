var express = require('express');
var app = express();
var apiRouter = require('./apiRouter.js');

app.use(express.static('public'));

app.get('/index', function (req, res) {
    res.sendFile('index.html');
});

app.use('/api/v1', apiRouter);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});