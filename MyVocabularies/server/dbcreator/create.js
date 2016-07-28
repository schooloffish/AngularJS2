var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var util = require('util');
var xml2json = require('simple-xml2json');

var connection = mysql.createConnection({
    host: '192.168.0.117',
    user: 'admin',
    password: '123456',
    multipleStatements: true
});

connection.connect();

var generateSqlFile = false;

var scriptFilenames = ['init.sql'];
var dbCreateString = '';

_.forEach(scriptFilenames, function (scriptFilename) {
    dbCreateString += fs.readFileSync(path.join(__dirname, scriptFilename), 'utf8');
});
// read bing dict xml
var xmlString = fs.readFileSync(path.join(__dirname, 'bing_dict.xml'), 'utf8');
var json = xml2json.parser(xmlString);

var sqlTemplate = 'insert into phrase (phrase,phonetic,meaning,last_update_timestamp) values %s';
var values = [];
_.forEach(json.fcvocaphraselist.phrases.phrase, function (phrase) {
    _.isString(phrase.phonetic) || (phrase.phonetic = '');
    var value = util.format("('%s','%s','%s','%s')", phrase.eng, phrase.phonetic.replace(/'/g, '`'), phrase.defi.replace(/\r\n/g, ''), phrase.date);
    values.push(value);
});
var insert_sql = util.format(sqlTemplate, values.join(','));
dbCreateString += insert_sql + ';\n';
values.length = 0;

//read youdao dict xml
xmlString = fs.readFileSync(path.join(__dirname, 'MyWords_YouDao.xml'), 'utf8');
json = xml2json.parser(xmlString);
_.forEach(json.wordbook.item, function (phrase) {
    _.isString(phrase.phonetic) || (phrase.phonetic = '');
    _.isString(phrase.trans) || (phrase.trans = '');

    var value = util.format("('%s','%s','%s','%s')", phrase.word.replace(/'/g, '`'), phrase.phonetic.replace(/'/g, '`'), phrase.trans.replace(/\r\n/g, ''), '2016-04-29 21:43:52');
    values.push(value);
});
insert_sql = util.format(sqlTemplate, values.join(','));
dbCreateString += insert_sql + ';';

if (generateSqlFile) {
    fs.writeFile(path.join(__dirname, 'result.sql'), dbCreateString, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
else {
    connection.query(dbCreateString, function (err, rows, fields) {
        if (err) throw err;
        console.log('Completed.');
        connection.end();
    });
}