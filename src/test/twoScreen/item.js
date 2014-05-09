define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Transitionable = require('famous/transitions/Transitionable');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');
    var GenericSync = require('famous/inputs/GenericSync');

    var SurfSize = 100;
    var ThumbnailSize = 50;

    function TwoScreenItem(model, eventCollection) {
        window.TT = Transform;
        window.item = this;

        View.call(this);

        this.model = model;
        this.eventCollection = eventCollection;

        _setupThumbnail.call(this);
        _setupSurfs.call(this);
        _syncEvent.call(this);

    }

    function _setupSurfs(){
        console.log(this.model.initX,this.model.initY,0)
        this.surf = new Surface({
            size:[SurfSize,SurfSize],
            properties:{
                backgroundColor: this.model.color
            }
        });
        this.surfMod = new Modifier({
            origin: [0,1],
            transform: Transform.translate(this.model.initX,this.model.initY,0)
        });
        this._add(this.surfMod).add(this.surf);
    }

    function _setupThumbnail(){
        this.thumbnail = new Surface({
            size:[ThumbnailSize,ThumbnailSize],
            properties:{
                backgroundColor: 'light'+this.model.color
            }
        });
        this.thumbnailMod = new Modifier({
            transform: Transform.translate(window.innerWidth,window.innerHeight, 0),
            opacity:0
        });

        this._add(this.thumbnailMod).add(this.thumbnail);
    }

    function _syncEvent(){
        this.pos = new Transitionable([0,0]);
        this.sync = new GenericSync(function(){
            return this.pos.get();
        }.bind(this), {syncClasses:[TouchSync]});

        this.surf.pipe(this.sync);

        this.sync.on('start', function(data) {
            this.pos.set([data.clientX,data.clientY]);
            this.thumbnailMod.setOpacity(1);
            this.thumbnailMod.setTransform(Transform.translate(this.pos.get()[0]-ThumbnailSize/2,this.pos.get()[1]-ThumbnailSize/2,10));

        }.bind(this));

        this.sync.on('update', function(data) {
            this.pos.set(data.position);
            this.thumbnailMod.setTransform(Transform.translate(this.pos.get()[0]-ThumbnailSize/2,this.pos.get()[1]-ThumbnailSize/2,10));
        }.bind(this));

        this.sync.on('end', function(data) {
            this.thumbnailMod.setTransform(Transform.translate(window.innerWidth,window.innerHeight, 0));
            this.thumbnailMod.setOpacity(0);
            var eventModel = this.eventCollection.create({
                velocity: data.velocity,
                color: 'light'+this.model.color
            });
            this.surf.setContent(['<div>',data.velocity[0],'</div>','<div>',data.velocity[1],'</div>'].join(''));
            setTimeout(function(){this.eventCollection.remove(eventModel)}.bind(this),3000);
        }.bind(this));
    }

    TwoScreenItem.prototype = Object.create(View.prototype);
    TwoScreenItem.prototype.constructor = TwoScreenItem;

    module.exports = TwoScreenItem;


});
