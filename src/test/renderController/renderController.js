define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var ViewSequence = require('famous/core/ViewSequence');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var RenderController = require("famous/views/RenderController");
    var Engine           = require("famous/core/Engine");

    function Drag() {

        window.PE = this;
        View.call(this);

        var surfaces = [];
        this.renderController = new RenderController();
        var counter = 0;

        for (var i = 0; i < 10; i++) {
            surfaces.push(new Surface({
                content: "Surface: " + (i + 1),
                size: [200, 200],
                properties: {
                    backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)",
                    lineHeight: "200px",
                    textAlign: 'center'
                }
            }));
        }

        this.renderController.show(surfaces[0]);
        Engine.on("click", function() {
            var next = (counter++ + 1) % surfaces.length;
            this.renderController.show(surfaces[next]);
        }.bind(this));

        this.add(this.renderController);
    }


    Drag.prototype = Object.create(View.prototype);
    Drag.prototype.constructor = Drag;

    Drag.prototype.events = function(){

    };

    module.exports = Drag;


});
