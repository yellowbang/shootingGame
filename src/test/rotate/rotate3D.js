define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var Transitionable = require('famous/transitions/Transitionable');


    var RotateRight = require('test/rotate/rotateRight');
    var RotateLeft = require('test/rotate/rotateLeft');

    var Size = 100;

    function Rotate() {
        window.TT = Transform;
        window.r = this;
        View.call(this);


        this.surf = new Surface({
            classes:['bon-surf'],
            size: [Size,Size],
            properties:{
                opacity:0.9
            }
        });

        this.translateMod1 = new Modifier({
            transform: Transform.translate(0,0,Size*Math.sqrt(3)/3)
        });
        this.originMod = new Modifier({
//            origin: [0.5,0.5]
        });
        this.rotateMod = new Modifier({
//            origin:[1,0]
        });
        this.translateMod2 = new Modifier({
            transform: Transform.translate(window.innerWidth/2,0,-Size*Math.sqrt(3)/3)
        });

        this.rotateMod.setTransform(Transform.rotateY(Math.PI), {duration:5000});
//        this.rotateMod.setTransform(Transform.rotateY(0), {duration:5000});

        this.add(this.translateMod2).add(this.rotateMod).add(this.originMod).add(this.translateMod1).add(this.surf);

    }


    Rotate.prototype = Object.create(View.prototype);
    Rotate.prototype.constructor = Rotate;


    module.exports = Rotate;


});
