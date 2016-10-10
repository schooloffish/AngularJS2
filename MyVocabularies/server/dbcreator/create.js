'use strict';

let mysql = require('mysql');
let fs = require('fs');
let path = require('path');
let _ = require('lodash');
let util = require('util');
let xml2json = require('simple-xml2json');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    multipleStatements: true
});

connection.connect();

let generateSqlFile = false;

let scriptFilenames = ['init.sql'];
let dbCreateString = '';

_.forEach(scriptFilenames, function (scriptFilename) {
    dbCreateString += fs.readFileSync(path.join(__dirname, scriptFilename), 'utf8');
});
let xmlString = '';
let json = null;
let sqlTemplate = 'insert into phrase (phrase,phonetic,meaning,last_update_timestamp) values %s';
let values = [];
let insert_sql
// read bing dict xml
// xmlString = fs.readFileSync(path.join(__dirname, 'bing_dict.xml'), 'utf8');
// json = xml2json.parser(xmlString);
// _.forEach(json.fcvocaphraselist.phrases.phrase, function (phrase) {
//     _.isString(phrase.phonetic) || (phrase.phonetic = '');
//     let value = util.format("('%s','%s','%s','%s')", phrase.eng, phrase.phonetic.replace(/'/g, '`'), phrase.defi.replace(/\r\n/g, ''), phrase.date);
//     values.push(value);
// });
// insert_sql = util.format(sqlTemplate, values.join(','));
// dbCreateString += insert_sql + ';\n';
// values.length = 0;

//read youdao dict xml
xmlString = fs.readFileSync(path.join(__dirname, 'MyWords_YouDao.xml'), 'utf8');
json = xml2json.parser(xmlString);
_.forEach(json.wordbook.item, function (phrase) {
    _.isString(phrase.phonetic) || (phrase.phonetic = '');
    _.isString(phrase.trans) || (phrase.trans = '');

    let value = util.format("('%s','%s','%s','%s')", phrase.word.replace(/'/g, '`'), phrase.phonetic.replace(/'/g, '`'), phrase.trans.replace(/\r\n/g, ''), '2016-04-29 21:43:52');
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
