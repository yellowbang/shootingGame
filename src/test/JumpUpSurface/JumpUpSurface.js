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
    var Rectangle = require('famous/physics/bodies/Rectangle');
    var Drag = require('famous/physics/forces/Drag');
    var Spring = require('famous/physics/forces/Spring');
    var VectorField = require ('famous/physics/forces/VectorField');
    var Distance = require ('famous/physics/constraints/Distance');
    var Vector = require('famous/math/Vector');
    var GenericSync         = require('famous/inputs/GenericSync');
    var TouchSync           = require('famous/inputs/TouchSync');
    var MouseSync           = require('famous/inputs/MouseSync');
    var Transitionable      = require('famous/transitions/Transitionable');

    function JumpUpSurface() {
        window.TT = Transform;
        window.PE = this;
        View.apply(this, arguments);
        _createView.call(this);

    }



    JumpUpSurface.prototype = Object.create(View.prototype);
    JumpUpSurface.prototype.constructor = JumpUpSurface;

    JumpUpSurface.DEFAULT_OPTIONS = {};


    module.exports = JumpUpSurface;


});
