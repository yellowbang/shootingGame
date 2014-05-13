define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Transitionable = require('famous/transitions/Transitionable');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');
    var GenericSync = require('famous/inputs/GenericSync');
    var Rectangle = require('famous/physics/bodies/Rectangle');
    var Particle = require('famous/physics/bodies/Particle');
    var Vector = require('famous/math/Vector');

    function Ring3DItem(options) {
        window.TT = Transform;
        window.item = this;

        View.call(this);
        this.options = options;

        _setupSurf.call(this);
//        _syncEvent.call(this);

    }

    Ring3DItem.prototype = Object.create(View.prototype);
    Ring3DItem.prototype.constructor = Ring3DItem;

    function _setupSurf(){
        this.surf = new Surface({
            size:[100,100],
            classes: ['bon-surf']
        });

        this.particle = new Rectangle({
            mass: 1,
            position : new Vector(0,300,0),
            velocity : new Vector(0,0,2*Math.PI/10000*300)
        });

        this.options.physicsEngine.addBody(this.particle);
        this.add(this.particle).add(this.surf);
        setTimeout(function(){this.options.physicsEngine.removeBody(this.particle)}.bind(this),10000)
    }

    module.exports = Ring3DItem;


});
