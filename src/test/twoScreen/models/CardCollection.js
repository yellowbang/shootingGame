define(function(require, exports, module) {
    var Card = require('test/twoScreen/models/Card');

    module.exports = Backbone.Firebase.Collection.extend({

        model: Card

    });
});