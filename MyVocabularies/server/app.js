var express = require('express');
var path = require('path');
var app = express();

var clientFolder = path.join(path.dirname(__dirname), 'client')
console.log(clientFolder);

app.use(express.static(clientFolder))

app.get('/', function (req, res) {
    res.send('hello,world!');
});

var router = express.Router();
var queryManager = require('./datasource/query.manager.js').manager;
queryManager.init({
    host: 'localhost',
    user: 'root',
    password: '123456',
    multipleStatements: true,
    database: 'MyVocabularies',
    options: {
        requestTimeout: 60
    }
});

require('./rest/phrase.js').addRouters(router, queryManager);

app.use('/api/v1', router);

//handle 404, to fix angular2 router and express router conflicts
app.use('*', function (req, res) {
    res.sendFile('index.html', { root: clientFolder });
});


app.listen(3000, function (params) {
    console.log('Example app listening on port 3000..');
})