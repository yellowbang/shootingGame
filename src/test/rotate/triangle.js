define(function(require, exports, module) {
    // import dependencies
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var GenericSync     = require('famous/inputs/GenericSync');
    var MouseSync       = require('famous/inputs/MouseSync');
    var TouchSync       = require('famous/inputs/TouchSync');
    GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});
    var Transitionable  = require('famous/transitions/Transitionable');

    var Size = window.innerWidth;

    function Triangle() {
        window.TT = Transform;
        window.tri = this;
        View.call(this);


        this.surfRotateMod = new Modifier({
            size:[Size, Size*Math.sqrt(3)/2],
            origin:[0.5, (Size/2/Math.sqrt(3))/(Size*Math.sqrt(3)/2)],
            align:[0,0]
        });

        this.trangleNode = this.add(this.surfRotateMod);

        this.surf1 = new Surface({
            size: [Size, Size],
            content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
            classes: ['bon-surf']
        });

        this.RotateMod1 = new Modifier({
            origin:[0,0],
            transform: Transform.rotateX(Math.PI/2.)
        });

        this.surf2 = new Surface({
            size: [Size, Size],
            content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
            classes: ['bon-surf'],
            properties: {
                backgroundColor:'rgba(255,0,0,0.8)'
            }
        });

        this.RotateMod2 = new Modifier({
            size:[Size,Size],
            transform: Transform.rotateY(-Math.PI/3)
        });

        this.RotateMod22 = new Modifier({
            origin:[1,0],
            size:[Size,Size],
            transform: Transform.rotateY(-Math.PI/3)
        });

        this.RotateMod222 = new Modifier({
            origin:[0,0],
            size:[Size,Size],
            transform: Transform.rotateX(Math.PI/2)
        });

        this.surf3 = new Surface({
            size: [Size, Size],
            content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
            classes: ['bon-surf'],
            properties: {
                backgroundColor:'rgba(0,0,255,0.8)'
            }
        });

        this.RotateMod3 = new Modifier({
            origin:[1,0],
            transform: Transform.rotateY(Math.PI/3)
        });

        this.RotateMod33 = new Modifier({
            size:[Size,Size],
            transform: Transform.multiply4x4(Transform.rotateX(Math.PI/2.),Transform.rotateY(Math.PI/3))
        });

        this.trangleNode.add(this.RotateMod1).add(this.surf1);
        this.trangleNode.add(this.RotateMod222).add(this.RotateMod22).add(this.RotateMod2).add(this.surf2);
        this.trangleNode.add(this.RotateMod33).add(this.RotateMod3).add(this.surf3);

        this.angle = new Transitionable(0);

        this.surfRotateMod.transformFrom(function(){
            return Transform.rotateZ(Date.now()/1000)
        }.bind(this));

        this.viewportMod = new Modifier({
            size:[Size,Size*Math.sqrt(3)/2],
            origin:[-0.5,-(Size/2/Math.sqrt(3))/(Size*Math.sqrt(3)/2)],
            align:[0.,0.],
            transform: Transform.rotateX(-Math.PI/2)
        });

        this.surfOriginMod2 = new Modifier({
            size:[Size,Size],
            origin:[0.5,0.5],
            align:[0.5,0.5]
        });

        this.add(this.surfOriginMod2).add(this.viewportMod).add(this.trangleNode);

        this.angleSyncEvent();

    }

    Triangle.prototype = Object.create(View.prototype);
    Triangle.prototype.constructor = Triangle;

    Triangle.prototype.angleSyncEvent = function(){
        this.sync = new GenericSync(
            ['mouse','touch'],
            {direction : GenericSync.DIRECTION_X}
        );

        this.surf1.pipe(this.sync);
        this.surf2.pipe(this.sync);
        this.surf3.pipe(this.sync);

        this.sync.on('update', function(data) {
            var currentPosition = this.angle.get();
            this.angle.set(currentPosition + data.delta);
        }.bind(this));

        this.sync.on('end', (function() {
            console.log(this.angle.get()/100)
            console.log(Math.round((this.angle.get()/100/Math.PI*180)/(120)))
            this.angle.set(Math.round((this.angle.get()/100/Math.PI*180)/(120))*Math.PI*2/3*100,{duration:500,curve:"easeOut"})
        }).bind(this));
    };






    module.exports = Triangle;

});
