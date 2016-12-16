'use strict';

let fs = require('fs');
let path = require('path');
let xml2json = require('simple-xml2json');


//read youdao dict xml
let xmlString = fs.readFileSync(path.join(__dirname, 'MyWords_YouDao.xml'), 'utf8');
let json = xml2json.parser(xmlString);

let words = [];
let count = 0;

for (let word of json.wordbook.item) {
    if (words.indexOf(word.word) === -1) {
        words.push(word.word);
    }
    else {
        count++;
        console.log(word.word + ' ' + count);
    }
}
