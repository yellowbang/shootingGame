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

    function NElementsRotatorItem(options) {

        this.physicsEngine = options.physicsEngine;

        View.apply(this, arguments);
        this.radiusLength = this.getDistance(this.options.RadiusPosition, this.options.ItemPosition);
        _addItem.call(this);
        _setupForce.call(this);
        _setupEvent.call(this);
    }

    NElementsRotatorItem.prototype = Object.create(View.prototype);
    NElementsRotatorItem.prototype.constructor = NElementsRotatorItem;

    NElementsRotatorItem.DEFAULT_OPTIONS = {
        Content: 'Hello',
        Size : [100,100],
        RadiusPosition: [window.innerWidth/2,window.innerHeight/2,0],
        ItemPosition : [0.15*window.innerWidth, window.innerHeight/2, 0],
        Velocity : [0,0,0.3],
        ForceStrength: 0.005,
        MaxSpeed: 0.3,
        DragStrength: 0.00022323
    };

    function _setupForce(){
        this.rotationalDrag = new Drag({
            strength: this.options.DragStrength
        });
        this.radius = new Distance({
            anchor : new Vector(this.options.RadiusPosition),
            length : this.radiusLength
        });
        this.physicsEngine.attach([this.radius,this.rotationalDrag], this.particle);
    }

    function _setupEvent(){
        Engine.on('keypress',function(){
            var v = new Vector(this.particle.getVelocity());
            if (this.getVelocityMagnitude(v)<= this.options.MaxSpeed)
                this.particle.applyForce(v.normalize(this.options.ForceStrength));
//            if
//            this.particle.setVelocity(v.normalize(this.options.))
        }.bind(this))
    }

    function _addItem(){
        this.item = new Surface({
            content:this.options.content,
            size:this.options.Size,
            classes: ['bon-surf']
        });
        this.itemMod = new Modifier({
            transform:Transform.translate(-this.options.Size[0]/2,-this.options.Size[1]/2,0)
        });
        this.particle = new Particle({
            velocity: this.options.Velocity,
            position: new Vector(this.options.ItemPosition)
        });
        this.physicsEngine.addBody(this.particle);
        this.add(this.particle).add(this.itemMod).add(this.item);
    }

    NElementsRotatorItem.prototype.getDistance = function(a,b){
        function dis(x,y){
            return Math.pow(x-y,2)
        }
        return Math.sqrt(dis(a[0],b[0])+dis(a[1],b[1])+dis(a[2],b[2]))
    };


    NElementsRotatorItem.prototype.getVelocityMagnitude = function(v){
        console.log(Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.z,2)))
        return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.z,2))
    };


    module.exports = NElementsRotatorItem;


});
