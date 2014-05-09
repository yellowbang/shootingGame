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

    function Rotate() {
        window.TT = Transform;
        window.r = this;
        View.call(this);

        this.angle = -Math.PI/2;

        this.right = new RotateRight();
        this.left = new RotateLeft();

        this.rightMod = new Modifier();
        this.leftMod1 = new Modifier({
//            origin:[0,0]
        });
        this.leftMod2 = new Modifier({
            transform: Transform.rotateY(this.angle)
        });

        this.node = new RenderNode();

        this.left2 = new Surface({
            size: [200, 200],
            content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
            properties: {
                lineHeight: '200px',
                textAlign: 'center',
                backgroundColor: 'yellow'

            }
        });

        this.left2Mod = new Modifier({
            origin: [0, 0.5],
            transform: Transform.rotateY(-1*this.angle)
        });

        this.node.add(this.right);
        this.node.add(this.leftMod2).add(this.left);

        this._add(this.rightMod).add(this.node);
        this._add(this.left2Mod).add(this.left2);

        this.right.outline.pipe(this);
        this.pipe(this.right);
        this.events();

//        this._eventInput.emit('click');

    }


    Rotate.prototype = Object.create(View.prototype);
    Rotate.prototype.constructor = Rotate;

    Rotate.prototype.events = function(){
        this.open = false;
        this.tran = new Transitionable([0,0]);
        var transition = { duration : 1000, curve: Easing.outSine };
        var transition2 = { duration : 1000, curve: Easing.inSine };
        this._eventInput.on('click', function(){
            if (this.open == false){
                this.rightMod.setTransform(Transform.translate(400,0,0),transition);
//                this.leftMod1.setTransform(Transform.translate(200,0,0),transition);
                this.leftMod2.setTransform(Transform.rotateY(0),{duration:1000});
                this.left2Mod.setTransform(Transform.rotateY(0),{duration:1000});
            } else {
                this.rightMod.setTransform(Transform.translate(0,0,0),transition2);
//                this.leftMod1.setTransform(Transform.translate(0,0,0),transition2);
                this.leftMod2.setTransform(Transform.rotateY(this.angle),{duration:1000});
                this.left2Mod.setTransform(Transform.rotateY(-1*this.angle),{duration:1000});
            }
            this.open = !this.open
        }.bind(this))
    };

    module.exports = Rotate;


});
