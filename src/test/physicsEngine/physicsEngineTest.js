define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Particle = require('famous/physics/bodies/Particle');
    var Circle = require('famous/physics/bodies/Circle');
    var Drag = require('famous/physics/forces/Drag');
    var Spring = require('famous/physics/forces/Spring');
    var Field = require ('famous/physics/forces/VectorField');
    var Vector = require('famous/math/Vector');

    function PhysicsEngineTest() {
        window.TT = Transform;
        window.PE = this;
        View.call(this);

        this.surf = new Surface({
            size:[100,100],
            properties:{
                backgroundColor:'yellow',
                borderRadius: 50 + 'px'
            }
        });
        this.particle = new Circle({radius:50,velocity : [0,0,0]});

        this.field = new Field({
            direction: new Vector(1,0,0)
//            field: new Vector([1,0,0])
        });

        this.physicsEngine = new PhysicsEngine();
        this.physicsEngine.addBody(this.particle);
        this.physicsEngine.attach(this.field,this.particle);
        this._add(this.particle).add(this.surf);
    }


    PhysicsEngineTest.prototype = Object.create(View.prototype);
    PhysicsEngineTest.prototype.constructor = PhysicsEngineTest;

    PhysicsEngineTest.prototype.events = function(){

    };

    module.exports = PhysicsEngineTest;


});
