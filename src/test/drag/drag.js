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

    var DragView = require('test/drag/dragView');

    function Drag() {
        window.TT = Transform;
        window.PE = this;
        View.call(this);

        this.surf = new Surface({
            size:[100,100],
            properties:{
                backgroundColor:'blue'
            }
        });
        this.surfNode = new Modifier({
            transform:Transform.translate(0,0,3)
        });
        this.surfMod = new Modifier({
            origin:[0.5,0.4],
            transform:Transform.translate(0,0,0)
        });

        this.drag = new Dragggable();
        this.surf.pipe(this.drag.sync);

        this.drag.eventOutput.pipe(this._eventOutput);
//        this._eventOutput.on('end', function(a){console.log('end', a)})

//        this.add(this.surfNode).add(this.surfMod).add(this.surf);
        this.surf1 = new DragView();
        this.add(this.surf1);
        this.surf2 = new Surface({
            size:[100,100],
            classes:['bon-surf']
        });
        this._add(new Modifier({origin:[0.5,0.5],transform:Transform.translate(0,0,2)})).add(this.surf2);

//        this.surf.on('click',function(){
//            alert('surf1')
//        }.bind(this));
        this.surf2.on('click',function(){
            alert('surf2')
        }.bind(this))
    }



    Drag.prototype = Object.create(View.prototype);
    Drag.prototype.constructor = Drag;

    Drag.prototype.events = function(){

    };

    module.exports = Drag;


});
