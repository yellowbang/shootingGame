define(function(require, exports, module) {
    var Player = require('app/models/Player');

    module.exports = Backbone.Firebase.Collection.extend({

        model: Player

    });
});