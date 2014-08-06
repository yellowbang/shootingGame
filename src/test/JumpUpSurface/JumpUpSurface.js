define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Spring = require('famous/physics/forces/Spring');
    var VectorField = require('famous/physics/forces/VectorField');
    var Wall = require('famous/physics/constraints/Wall');
    var Vector = require('famous/math/Vector');

    var JumpUpSurfaceItem = require('test/JumpUpSurface/JumpUpSurfaceItem');

    var SPEED = [0.7,0.75,0.8,0.85,0.9,0.95,1];

    function JumpUpSurface(options) {

        View.apply(this, arguments);

        _createPhysics.call(this);
        _setupEvent.call(this);
    }

    JumpUpSurface.prototype = Object.create(View.prototype);
    JumpUpSurface.prototype.constructor = JumpUpSurface;

    JumpUpSurface.DEFAULT_OPTIONS = {
        size:[200,200]
    };

    function _createPhysics(){
        this.physicsEngine = new PhysicsEngine();
        this.gravityField = new VectorField({
            direction: new Vector([0,0.001,0])
        });
        this.wall = new Wall({
            normal: [0,-1,0],
            distance: window.innerHeight+this.options.size[1]+100,
            restitution: -1
        });
    }

    function _setupEvent(){
        Engine.on('keyup',function(e){
            console.log(e);
            this.addItem({content: e.keyCode})
        }.bind(this))
    }

    JumpUpSurface.prototype.addItem = function(model){
        var item = new JumpUpSurfaceItem({
            physicsEngine: this.physicsEngine,
            word: String.fromCharCode(model.content),
            size: this.options.size,
            initVelocity: [0,-SPEED[Math.floor(Math.random()*SPEED.length)],0]
        });
        this.physicsEngine.addBody(item.particle);
        this.physicsEngine.attach([this.gravityField,this.wall], item.particle);
        this.add(item);
    };

    module.exports = JumpUpSurface;


});
