define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Spring = require('famous/physics/forces/Spring');
    var RotationalDrag = require('famous/physics/forces/RotationalDrag');
    var Drag = require('famous/physics/forces/Drag');
    var VectorField = require('famous/physics/forces/VectorField');
    var Distance = require('famous/physics/constraints/Distance');
    var Vector = require('famous/math/Vector');
    var Particle = require('famous/physics/bodies/Particle');

    var NElementsRotatorItem = require('test/Ring3D/NElementsRotatorItem')

    function NElementsRotator(options) {

        this.physicsEngine = new PhysicsEngine();
        View.apply(this, arguments);
        _setupForce.call(this);
        _setupEvent.call(this);
        _setupItems.call(this);
    }

    NElementsRotator.prototype = Object.create(View.prototype);
    NElementsRotator.prototype.constructor = NElementsRotator;

    NElementsRotator.DEFAULT_OPTIONS = {
        Num:8,
        Radius: window.innerWidth*0.3,
        Ypos: window.innerHeight*0.25,
        InitSpeed: 0.3
    };

    function _setupForce(){
        this.rotationalDrag = new Drag({
            strength: this.options.DragStrength
        });
        this.radius = new Distance({
            anchor : new Vector(this.options.RadiusPosition),
            length : this.radiusLength
        });
    }

    function _setupEvent(){

    }

    function _setupItems(){
        var delAngle = 2*Math.PI / this.options.Num;
        for (var i = 0; i<this.options.Num; i++){
            this._addItem({
                ItemPosition: this.getItemPosition(i*delAngle),
                Velocity: new Vector(this.getItemVelocity(i*delAngle))
            });
        }
//        this._addItem({
//            ItemPosition: this.getItemPosition(0),
//            Velocity: new Vector(this.getItemVelocity(0))
//        });
//        this._addItem({
//            ItemPosition: this.getItemPosition(Math.PI),
//            Velocity: new Vector(this.getItemVelocity(Math.PI))
//        });
////        this._addItem({
////            ItemPosition: [(1-0.15)*window.innerWidth, window.innerHeight*0.2, 0],
////            Velocity: new Vector(0,0,-1)
////        });
    }

    NElementsRotator.prototype._addItem = function(options){
        var item = new NElementsRotatorItem({
            physicsEngine:this.physicsEngine,
            RadiusPosition: [window.innerWidth/2,this.options.Ypos,0],
            ItemPosition : options.ItemPosition,
            Velocity: (options.Velocity)? options.Velocity.normalize(this.options.InitSpeed) : null
        });
        this.physicsEngine.attach([this.radius,this.rotationalDrag], item.particle);
        this.add(item);
    };

    NElementsRotator.prototype.getItemPosition = function(angle){
        var x = window.innerWidth/2 - Math.cos(angle)*this.options.Radius;
        var z = Math.sin(angle)*this.options.Radius;
        return [x,this.options.Ypos,z]
    };

    NElementsRotator.prototype.getItemVelocity = function(angle){
        var x = Math.sin(angle);
        var z = Math.cos(angle);
        return [x,0,z];
    };

    module.exports = NElementsRotator;


});
