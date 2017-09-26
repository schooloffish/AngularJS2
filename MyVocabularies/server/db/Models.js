let path = require('path');
let Sequelize = require('Sequelize');
let sequelize = new Sequelize('main', 'testuser', '123456', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // SQLite only
    storage: path.join(__dirname, 'test.sqlite')
});

let Phrase = sequelize.define('phrase', {
    phrase: {
        type: Sequelize.STRING,
        field: 'phrase'
    },
    phonetic: {
        type: Sequelize.STRING,
        field: 'phonetic'
    },
    meaning: {
        type: Sequelize.STRING,
        field: 'meaning'
    },
    correctness: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'correctness'
    },
    incorrectness: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'incorrectness'
    }
});

let Example = sequelize.define('example', {
    phraseId: {
        type: Sequelize.INTEGER,
        references: {
            model: Phrase,
            key: 'id'
        }
    },
    sentence: {
        type: Sequelize.STRING,
        field: 'sentence'
    }
});

module.exports = {
    Phrase: Phrase,
    Example: Example
}