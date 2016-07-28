var _=require('lodash');

var Phrase=(
    function () {
        Phrase=function (queryManager) {
            this.queryManager=queryManager;
        }

        Phrase.prototype.getPhrases=function (req,res) {
            var rrr=this.queryManager.test()
            return res.status(200).json({name:rrr});
        }

        return Phrase;
    }
)();

exports.addRouters=function (router,queryManager) {
    var phrase=new Phrase(queryManager);
    router.get('/phrase', _.bind(phrase.getPhrases,phrase));
}