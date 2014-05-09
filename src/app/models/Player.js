define(function(require, exports, module) {
    module.exports = Backbone.Model.extend({
        defaults: {
            name: "unknown",
            move: {x:0,y:0,z:0},
            bullet: {x:0,y:0,z:0},
            health: 3
        }
    });
});