define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Spring = require('famous/physics/forces/Spring');
    var VectorField = require('famous/physics/forces/VectorField');
    var Vector = require('famous/math/Vector');

    var Ring3DItem = require('test/Ring3D/item');

    var Constant = require('test/Ring3D/Constant');

    function Ring3D(options) {

        View.apply(this, arguments);
        this.options.Radius = this.getDistance(this.options.Position, this.options.StringPosition);
        this.options.Speed = 2 * Math.PI / this.options.Period * this.options.Radius;
        this.physicsEngine = new PhysicsEngine();


        _setupBackground.call(this);
        _setupForce.call(this);
        _setupEvent.call(this);
    }

    Ring3D.prototype = Object.create(View.prototype);
    Ring3D.prototype.constructor = Ring3D;

    Ring3D.DEFAULT_OPTIONS = {
        Content: 'Hello',
        Size : [100,100],
        Period : 10000,
        StringPosition: [window.innerWidth/2,window.innerHeight/2,0],
        Position : [0, window.innerHeight/2, 0],
        Velocity : [0,0,1]
    };

    function _setupBackground(){
        this.background = new Surface({
            content:'Please type something here',
            classes: ['bon-background']
        });
        this.add(this.background);
    }

    function _setupForce(){
        this.spring = new Spring ({
            dampingRatio : 0.,
            forceFunction: Spring.FORCE_FUNCTIONS.HOOK,
            period: this.options.Period,
            anchor: new Vector(this.options.StringPosition)
        });
    }

    function _setupEvent(){
        Engine.on('keyup',function(e){
            console.log(e);
            this.addItem({content: e.keyCode})
        }.bind(this))
    }

    Ring3D.prototype.addItem = function(model){
        var item = new Ring3DItem({
            physicsEngine: this.physicsEngine,
            content: model.content || this.options.Content,
            size: this.options.Size,
            initPosition: new Vector(this.options.Position),
            initVelocity: new Vector(this.options.Velocity).mult(this.options.Speed),
            period: this.options.Period
        });
        this.physicsEngine.attach(this.spring, item.particle);
        this.add(item);
    };

    Ring3D.prototype.getDistance = function(pos1, pos2){
        return Math.sqrt(Math.pow((pos1[0] - pos2[0]),2)+ Math.pow((pos1[1] - pos2[1]),2));

    };

    module.exports = Ring3D;


});
