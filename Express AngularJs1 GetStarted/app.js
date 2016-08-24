var express = require('express');
var app = express();
var apiRouter = express.Router();

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/index', function (req, res) {
    res.sendFile('index.html');
});

apiRouter.get('/phones', function (req, res) {
    return res.json([{ name: 'iPhone 6', price: 2000, id: 1 }, { name: 'iPhone 4', price: 800, id: 2 }]);
});

app.use('/api/v1', apiRouter);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});