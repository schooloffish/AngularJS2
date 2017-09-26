'use strict';

let fs = require('fs');
let path = require('path');
let _ = require('lodash');
let util = require('util');
let parseString = require('xml2js').parseString;

let Phrase = require('./Models.js').Phrase;
let Example = require('./Models.js').Example;

/*
* init phrases
*
*/
let xmlString = fs.readFileSync(path.join(__dirname, 'MyWords_YouDao.xml'), 'utf8');
parseString(xmlString, { explicitArray: false }, (err, result) => {
    Phrase.sync({ force: true }).then(function () {
        let promiseTasks = [];
        _.forEach(result.wordbook.item, function (phrase) {
            _.isString(phrase.phonetic) || (phrase.phonetic = '');
            _.isString(phrase.trans) || (phrase.trans = '');
            let word = phrase.word.replace(/'/g, '`');
            let phonetic = phrase.phonetic.replace(/'/g, '`');
            let definition = phrase.trans.replace(/\r\n/g, '');
            // Table created
            promiseTasks.push(
                Phrase.create({
                    phrase: word,
                    phonetic: phonetic,
                    meaning: definition
                })
            );
        });
        return Promise.all(promiseTasks);
    }).then(() => {
        insertExample();
    });
});

/*
* init examples
*
*/
function insertExample() {
    let txtFilePath = path.join(__dirname, 'examples.txt');

    let lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(txtFilePath)
    });
    let lineNumber = 0;
    lineReader.on('line', function (line, a, b) {
        lineNumber++;
        let array = line.split('|');
        let phrase = array[0];
        let example = array[1];
        Phrase.findAll({
            where: {
                phrase: phrase
            }
        }).then((result) => {
            if (result && result.length) {
                let phraseId = result[0].id;
                console.log(`id:${phraseId},sentence:${example}`);
                Example.sync({ force: true }).then(() => {
                    Example.create({
                        phraseId: phraseId,
                        sentence: example
                    }).then(() => {
                        console.log('insert example succesfully, line number:%s', lineNumber);
                    }).catch(err => {
                        console.log('failed to insert example, line number:%s, error:%s', lineNumber, err.message || err);
                    });
                });
            }
        });
    });
}


// Phrase.count().then(function (count) {
//     console.log('test count:%s', count);
// });

// Phrase.sync({ force: true }).then(function () {
//     // Table created
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
// }).then(function () {
//     return User.findOne();
// }).then(function (data) {
//     console.log('full name: %s', data.firstName + data.lastName);
// });