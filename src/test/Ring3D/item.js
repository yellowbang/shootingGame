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
    var RenderController = require("famous/views/RenderController");

    function Ring3DItem(options) {
        window.TT = Transform;
        window.item = this;

        View.call(this);
        this.options = options;

        this.renderController = new RenderController();
        this.renderNode = new RenderNode();
        this.add(this.renderController);

        _setupSurf.call(this);
//        _syncEvent.call(this);

    }

    Ring3DItem.prototype = Object.create(View.prototype);
    Ring3DItem.prototype.constructor = Ring3DItem;

    function _setupSurf(){
        this.surf = new Surface({
            size:this.options.size,
            classes: this.options.classes? this.options.classes:['bon-surf']
        });
        this.setContent(this.options.content);
        this.surfMod = new Modifier({
            transform: Transform.translate(-this.options.size[0]/2,-this.options.size[0]/2,0)
        });

        this.particle = new Rectangle({
            mass: 1,
            position : new Vector(this.options.initPosition),
            velocity : new Vector(this.options.initVelocity)
        });

        this.options.physicsEngine.addBody(this.particle);
        this.renderNode.add(this.particle).add(this.surfMod).add(this.surf);
        this.renderController.show(this.renderNode);
        setTimeout(function(){
            this.options.physicsEngine.removeBody(this.particle)
        }.bind(this),this.options.period);
        setTimeout(function(){
            this.renderController.hide();
        }.bind(this),this.options.period-500)
    }

    Ring3DItem.prototype.setContent = function(content){
        this.surf.setContent(content);
    };

    module.exports = Ring3DItem;


});
