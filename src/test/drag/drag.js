define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Dragggable = require('famous/modifiers/Draggable');
    var Fader = require('famous/modifiers/Fader');
    var Easing = require('famous/transitions/Easing');
    var Transitionable = require('famous/transitions/Transitionable');

    function Drag() {
        window.TT = Transform;
        window.PE = this;
        View.call(this);

        this.surf = new Surface({
            size:[100,100],
            properties:{
                backgroundColor:'yellow'
            }
        });

        this.drag = new Dragggable();
        this.surf.pipe(this.drag.sync);

        this.drag.eventOutput.pipe(this._eventOutput);
//        this._eventOutput.on('end', function(a){console.log('end', a)})

        this._add(this.drag).add(this.surf);

        this.surf2 = new Surface({
            size:[100,100],
            classes:['bon-surf']
        });
        this._add(new Modifier({origin:[0.5,0.5]})).add(this.surf2);

    }


    Drag.prototype = Object.create(View.prototype);
    Drag.prototype.constructor = Drag;

    Drag.prototype.events = function(){

    };

    module.exports = Drag;


});
