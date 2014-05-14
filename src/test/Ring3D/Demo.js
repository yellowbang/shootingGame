define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');

    function Demo(options) {

        View.apply(this, arguments);

    }

    Demo.prototype = Object.create(View.prototype);
    Demo.prototype.constructor = Demo;


    module.exports = Demo;


});
