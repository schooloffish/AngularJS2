var _ = require('lodash');
var dal = require('../datasource/Dal.js');

var Phrase = (
    function () {
        Phrase = function (queryManager) {
            this.queryManager = queryManager;
        }

        Phrase.prototype.getPhrases = function (req, res) {
            dal.getPhrase(function name(err, result) {
                if (err) {
                    return res.sendStatus(500);
                }
                return res.status(200).json(result);
            });
        }

        Phrase.prototype.insertSentence = function (req, res) {

            dal.insertSentence(req.body, function name(err, result) {
                if (err) {
                    return res.sendStatus(500);
                }
                return res.status(200).json(result);
            });
        }

        return Phrase;
    }
)();

exports.addRouters = function (router, queryManager) {
    var phrase = new Phrase(queryManager);
    router.get('/phrase', _.bind(phrase.getPhrases, phrase));
    router.post('/phrase', _.bind(phrase.insertSentence, phrase));
}