define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var RenderController = require('famous/views/RenderController');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Transitionable = require('famous/transitions/Transitionable');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');
    var GenericSync = require('famous/inputs/GenericSync');

    var Config = require('test/twoScreen2/config');

    var SURFSIZE = Config.ThumbnailSize;
    var DETECTIONAREA = Config.OutputArea;

    function TwoScreenItem(options) {

        View.apply(this,arguments);

        _setupItem.call(this);
        _syncEvent.call(this);

    }

    function _setupItem(){
        this.renderController = new RenderController({
            outTransition: {duration: 100}
        });
        this.add(this.renderController);
        this.renderNode = new RenderNode();
        this.surf = new Surface({
            size:[SURFSIZE,SURFSIZE],
            content: this.setItemContent(),
            classes: ['twoScreen-item-surf']
        });
        this.surfMod = new Modifier({
            transform: Transform.translate(this.options.pos[0],this.options.pos[1],0)
        });
        this.renderNode.add(this.surfMod).add(this.surf);
        this.renderController.show(this.renderNode);
    }

    function _syncEvent(){
        this.pos = new Transitionable([0,0]);
        this.sync = new GenericSync(function(){
            return this.pos.get();
        }.bind(this), {syncClasses:[TouchSync]});

        this.surf.pipe(this.sync);

        this.sync.on('start', function(data) {
            this.pos.set([data.clientX,data.clientY]);
        }.bind(this));

        this.sync.on('update', function(data) {
            this.pos.set(data.position);
            this.surfMod.setTransform(Transform.translate(this.pos.get()[0] - SURFSIZE/2,this.pos.get()[1] - SURFSIZE/2,10));
        }.bind(this));

        this.sync.on('end', function() {
            if (this.isEdge(this.pos.get())){
                this.renderController.hide();
//                this._eventOutput.emit('outputItem', this.surf.getContent());
                this._eventOutput.emit('outputItem', this.surf._currTarget.innerHTML);
            }
        }.bind(this));
    }

    TwoScreenItem.prototype = Object.create(View.prototype);
    TwoScreenItem.prototype.constructor = TwoScreenItem;

    TwoScreenItem.prototype.isEdge = function(pos){
        return (
                (pos[0] < DETECTIONAREA) || (pos[0] > window.innerWidth-DETECTIONAREA) ||
                (pos[1] < DETECTIONAREA) || (pos[1] > window.innerHeight-DETECTIONAREA)
            )
    };

    TwoScreenItem.prototype.setItemContent = function(){
        return [this.options.content]
    };

    module.exports = TwoScreenItem;


});
