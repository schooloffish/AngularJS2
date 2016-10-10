'use strict';

let mysql = require('mysql');
let fs = require('fs');
let path = require('path');
let _ = require('lodash');
let util = require('util');
let xml2json = require('simple-xml2json');

let QueryManager = require('../datasource/query.manager');
let queryManager = new QueryManager({
    host: 'localhost',
    user: 'root',
    password: '123456',
    multipleStatements: true,
    database: 'MyVocabularies',
    options: {
        requestTimeout: 60
    }
});


let sqlTemplate = 'insert into phrase (phrase,phonetic,meaning,last_update_timestamp) values %s';
let values = [];
let insert_sql;

let txtFilePath = path.join(__dirname, 'examples.txt');

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(txtFilePath)
});

lineReader.on('line', function (line) {
    let array = line.split('|');
    let phrase = array[0];
    let example = array[1];
    queryManager.executor({ text: 'SELECT phrase_id FROM phrase WHERE phrase=@phrase;' }, { phrase: phrase }, null).then(data => {
        if (data && data.length) {
            let phraseId = data[0].phrase_id;
            return queryManager.executor({ text: 'insert example (phrase_id,sentence,last_update_timestamp) values (@phraseId,@sentence,now());' }, { phraseId: phraseId, sentence: example }, null);
        }
        return Promise.reject(new Error(`Phrase ${phrase} is not found in db.`));
    }).then(data => {
        console.log('insert successfully.');
    }, err => {
        console.log(`failed to insert, error: ${err.message}`);
    });
});



// if (generateSqlFile) {
//     fs.writeFile(path.join(__dirname, 'result.sql'), dbCreateString, function (err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });
// }
// else {
//     connection.query(dbCreateString, function (err, rows, fields) {
//         if (err) throw err;
//         console.log('Completed.');
//         connection.end();
//     });
// }
