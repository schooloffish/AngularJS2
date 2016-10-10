SET FOREIGN_KEY_CHECKS = 0;

drop schema if exists `MyVocabularies`;
CREATE SCHEMA `MyVocabularies`;
use `MyVocabularies`;

CREATE TABLE phrase(
`phrase_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'phrase Id of each phrase',
`phrase` VARCHAR(45) NOT NULL COMMENT 'phrase we would like to remember',
`phonetic` VARCHAR(45) NOT NULL COMMENT 'prounciation of phrase',
`meaning` VARCHAR(300) NOT NULL COMMENT 'meaning of phrase',
`correctness` INT NULL COMMENT 'To store how many times you remember correctly this phrase',
`incorrectness` INT NULL COMMENT 'To store how many times you remember incorrectly this phrase',
`last_update_timestamp` DATETIME NOT NULL COMMENT 'time the row was last updated.',
PRIMARY KEY (`phrase_id`))
COMMENT = 'The phrase stores phrases people want to remember.';

CREATE TABLE example(
`example_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'example id of each example',
`phrase_id` BIGINT NOT NULL COMMENT 'phrase id',
`sentence` VARCHAR(1000) NOT NULL COMMENT 'sentence containing the phrase',
`last_update_timestamp` DATETIME NOT NULL COMMENT 'Time the row was last updated.',
PRIMARY KEY (`example_id`))
COMMENT = 'The example stores example sentences for remembering.';