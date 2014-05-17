define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Scrollvieww = require('famous/views/Scrollview');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var Transitionable = require('famous/transitions/Transitionable');
    var ViewSequence        = require('famous/core/ViewSequence');
    var Field = require ('famous/physics/forces/VectorField');
    var Spring = require ('famous/physics/forces/Spring');
    var Vector = require('famous/math/Vector');

    var Item = require('test/scrollview/item');
    var SpinView = require('test/scrollview/spinView');

    var Length = 3;

    function TestScrollview() {
        window.TT = Transform;
        window.VV = Vector;
        window.s = this;
        View.call(this);

        this.sequence = [];

        for (var i = 0; i <Length; i++){
//            var item = new Item({index:i});
            var color = 360/Length*i;
            var item = new Surface({
                size: [window.innerWidth+200, window.innerHeight+10],
                content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
                properties: {
                    lineHeight: '200px',
                    textAlign: 'center',
                    backgroundColor: 'hsl('+ color +',100%, 50%)'
                }
            });
            item.pipe(this._eventOutput);
            this.sequence.push(item);
        }

        this.scrollview = new SpinView({
            direction:0,
            margin:window.innerWidth,
            friction: 0.01,
            paginated:true,
            pagePeriod: 150,
            pageDamp:1,
            rails:false,
            spinDuration: 4000,
            parallaxDuration: 6000,
            period:10150

        });
        var sequence = new ViewSequence({array:this.sequence, index:0, loop:true});
        this.scrollview.sequenceFrom(sequence);

        this._eventOutput.pipe(this.scrollview);
        this._add(this.scrollview);

        this.scrollview.sync.on('start',function(){console.log('sync start')});

        this.field1 = new Field({
            direction: new Vector(1,0,0),
            strength:0.005

        });
        this.field2 = new Field({
            direction: new Vector(-1,0,0),
            strength:0.005

        });

        this.scrollview.startSpin.bind(this.scrollview);
        setInterval(this.scrollview.startSpin.bind(this.scrollview),10150);

//        this.scrollview.startSpin();
//        window.setInterval(this.scrollview.startSpin(),20000);

//        this.spins();
//        window.setInterval(this.spins.bind(this),10000)


    }


    TestScrollview.prototype = Object.create(View.prototype);
    TestScrollview.prototype.constructor = TestScrollview;

    TestScrollview.prototype.spins = function(){
        this.scrollview._physicsEngine.detachAll();
        var field1 = this.scrollview._physicsEngine.attach(this.field2, this.scrollview._particle);
        setTimeout(function(){
            this.scrollview._physicsEngine.detach(field1);
            var field2 = this.scrollview._physicsEngine.attach(this.field1, this.scrollview._particle);
            setTimeout(function(){
                this.scrollview._physicsEngine.detach(field2);
                this.scrollview._eventInput.emit('end',{velocity:0})
            }.bind(this),2000);
        }.bind(this),2000);
    };

    TestScrollview.prototype.events = function(){

    };

    module.exports = TestScrollview;


});
