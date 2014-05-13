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
    var Vector = require('famous/math/Vector');

    function SurfacesNetItem(options) {
        window.TT = Transform;
        window.item = this;

        View.call(this);
        this.options = options;
        this.push = new Vector(0,0,1);

        _setupSurf.call(this);
        _syncEvent.call(this);

    }

    function _setupSurf(){
        this.container = new ContainerSurface({
            size:this.options.size,
            properties:{
                overflow: 'hidden'
            }
        });

        this.img = new Surface({
            size:this.options.size,
            classes: ['bon-surf'],
            content: this.setImg()
        });
        this.imgMod = new Modifier({
            transform: Transform.translate(-this.options.pos[0],-this.options.pos[1],0)
        });
        this.container.add(this.imgMod).add(this.img);

        this.particle = new Rectangle({
            size: this.options.size,
            mass: 1,
            position : new Vector(this.options.pos[0],this.options.pos[1],0),
            velocity : new Vector(0,0,0)
        });

        this.options.physicsEngine.addBody(this.particle);
        this.add(this.particle).add(this.container);
    }

    function _syncEvent(){
        this.container.on('click', this.applyPush.bind(this));

    }

    SurfacesNetItem.prototype = Object.create(View.prototype);
    SurfacesNetItem.prototype.constructor = SurfacesNetItem;

    SurfacesNetItem.prototype.applyPush = function(){
        this.particle.setVelocity(this.push.mult(-2));
    };

    SurfacesNetItem.prototype.setImg = function(){
        return (['<img src="',
            this.options.imageURL,
            '" height = "', this.options.imageSize[1],
            '" width = "', this.options.imageSize[0],
            '">'].join(''))
    };

    module.exports = SurfacesNetItem;


});
