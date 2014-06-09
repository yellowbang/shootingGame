define(function(require, exports, module) {
    var Event = require('test/twoScreen/models/Event');

    module.exports = Backbone.Firebase.Collection.extend({

        model: Event

    });
});