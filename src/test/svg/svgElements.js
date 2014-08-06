define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Particle = require('famous/physics/bodies/Particle');
    var Circle = require('famous/physics/bodies/Circle');
    var Drag = require('famous/physics/forces/Drag');
    var Spring = require('famous/physics/forces/Spring');
    var Field = require ('famous/physics/forces/VectorField');
    var Vector = require('famous/math/Vector');

    function SvgElements() {
        window.TT = Transform;
        window.PE = this;
        View.call(this);

        this.svg = new Surface({
            size:[100,100],
            properties:{
                backgroundColor:'yellow',
                borderRadius: 50 + 'px'
            }
        });

        this.field = new Field({
            direction: new Vector(0,1,0)
        });

        this.add(this.svg);
        this.physicsEngine = new PhysicsEngine();
//        this.physicsEngine.addBody(this.particle);
//        this.physicsEngine.attach(this.field,this.particle);
//        this._add(this.particle).add(this.svg);
    }


    SvgElements.prototype = Object.create(View.prototype);
    SvgElements.prototype.constructor = SvgElements;

    SvgElements.prototype.events = function(){

    };

    SvgElements.prototype.setSvg = function(){
        var content = '<img class="bonsvg" src="flag.svg"/>';
        this.svg.setContent(content);
    };

    module.exports = SvgElements;


});
