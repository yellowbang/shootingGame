define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var RenderController = require("famous/views/RenderController");
    var Surface = require('famous/core/Surface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
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

    var ITEM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var SPEED = [0.7,0.75,0.8,0.85,0.9,0.95,1];

    function JumpUpSurfaceItem() {
        window.TT = Transform;
        window.PE = this;

        View.apply(this, arguments);
        this.options.initPosition = [(window.innerWidth-this.options.size[0])*Math.random(),window.innerHeight+this.options.size[1]-200,0];
        this.renderController = new RenderController();
        this.renderNode = new RenderNode();
        this.add(this.renderController);

        _createView.call(this);
        _createParticle.call(this);

    }

    JumpUpSurfaceItem.prototype = Object.create(View.prototype);
    JumpUpSurfaceItem.prototype.constructor = JumpUpSurfaceItem;

    JumpUpSurfaceItem.DEFAULT_OPTIONS = {
        size: [100,100],
        word: ITEM[Math.floor(Math.random()*ITEM.length)],
        initVelocity: [0,-SPEED[Math.floor(Math.random()*SPEED.length)],0],
        fontSizeFront: '90px',
        fontSizeBack: '90px'
    };

    function _createView(){
        this.wordBack = new Surface({
            size: [true,true],
            properties:{
                fontSize:this.options.fontSizeBack
            }
        });
        this.wordFront = new Surface({
            size: [true,true],
            properties:{
                fontSize:this.options.fontSizeFront
            }
        });
        this.setWord();
    }

    function _createParticle(){
        this.particle = new Particle({
            position: new Vector(this.options.initPosition),
            velocity: new Vector(this.options.initVelocity)
        });
        this.renderNode.add(this.particle).add(this.wordBack);
        this.renderController.show(this.renderNode);
    }

    JumpUpSurfaceItem.prototype.setWord = function(){
        var content = ['<div class="jump-up-surface-word">',this.options.word,'</div>'].join('');
        this.wordFront.setContent(['<div style="color:#000000">',content,'</div>'].join(''));
        this.wordBack.setContent(['<div>',content,'</div>'].join(''));
    };

    module.exports = JumpUpSurfaceItem;


});
