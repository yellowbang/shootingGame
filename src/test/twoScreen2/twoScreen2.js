define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var RenderController = require('famous/views/RenderController');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Transitionable = require('famous/transitions/Transitionable');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');
    var GenericSync = require('famous/inputs/GenericSync');

    var TwoScreenItem = require('test/twoScreen2/item');
    var CardCollection = require('test/twoScreen2/models/CardCollection');
    var EventCollection = require('test/twoScreen2/models/EventCollection');
    var Config = require('test/twoScreen2/config');

    var EventsURL = "https://flickering-fire-5114.firebaseio.com/twoScreen2";

    var THUMBNAILSIZE = Config.ThumbnailSize;
    var DETECTIONAREA = Config.DetectionArea;

    function TwoScreen2() {
        window.TT = Transform;
        window.two = this;
        View.call(this);

        this.eventsCollection = new EventCollection([],{
            firebase: EventsURL
        });

        _setupReceiveSurf.call(this);
        _setupEvents.call(this);
        this.defaultCollection();

    }


    TwoScreen2.prototype = Object.create(View.prototype);
    TwoScreen2.prototype.constructor = TwoScreen2;


    TwoScreen2.prototype.defaultCollection = function(){
        var list = this.shuffleArray(Config.DISPLAY_OBJECTS);
        for (var i = 0; i < 3; i++){
            this.addASurf(list[i], [Math.random()*(window.innerWidth-THUMBNAILSIZE),Math.random()*(window.innerWidth-THUMBNAILSIZE)])
        }
    };

    TwoScreen2.prototype.addASurf = function(content,pos){
        var item = new TwoScreenItem({
            content:content,
            pos: pos
        });
        item.pipe(this._eventOutput);
        var itemMod = new Modifier({
            size:[200,200]
        });
        this.add(itemMod).add(item);
    };

    function _setupReceiveSurf(){
        this.renderController = new RenderController({
            outTransition: {duration: 100}
        });
        this.renderNode = new RenderNode();
        this.add(this.renderController);

        this.maskSurf = new Surface({
            size:[undefined, undefined],
            properties:{
                backgroundColor:'grey'
            }
        });
        this.add(this.maskSurf);
        this.thumbnailSurf = new Surface({
            size:[THUMBNAILSIZE,THUMBNAILSIZE]
        });
        this.thumbnailSurfMod = new Modifier({
            transform: Transform.translate(window.innerWidth,window.innerHeight,0)
        });
        this.renderNode.add(this.thumbnailSurfMod).add(this.thumbnailSurf);
//        this.add(this.thumbnailSurfMod).add(this.thumbnailSurf);

        this.pos = new Transitionable([0,0]);
        this.receiveSync = new GenericSync(function(){
            return this.pos.get();
        }.bind(this), {syncClasses:[TouchSync]});

        this.maskSurf.pipe(this.receiveSync);
        _setupReceiveSurfSyncEvent.call(this);
    }


    function _setupReceiveSurfSyncEvent(){
        this.receiveSync.on('start', function(data) {
            this.pos.set([data.clientX,data.clientY]);

            if (this.isEdge(this.pos.get()) && this.eventsCollection.length > 0){
                this.setThumbnailContent();
                this.removeUsedModel();
                this.renderController.show(this.renderNode);
                this.thumbnailSurfMod.setTransform(Transform.translate(this.pos.get()[0] - THUMBNAILSIZE/2,this.pos.get()[1] - THUMBNAILSIZE/2,0));
                this.newItem = true;
            } else {
                this.eventsCollection.once('add',function(e,model,value){
                    this.renderController.show(this.renderNode);
                    this.setThumbnailContent();
                    this.removeUsedModel();
                    this.newItem = true
                }.bind(this));
            }
        }.bind(this));

        this.receiveSync.on('update', function(data) {
            this.pos.set(data.position);
            this.thumbnailSurfMod.setTransform(Transform.translate(this.pos.get()[0] - THUMBNAILSIZE/2,this.pos.get()[1] - THUMBNAILSIZE/2,0));

        }.bind(this));

        this.receiveSync.on('end', function() {
            this.eventsCollection.off();

            if (this.newItem == true){
                if (this.isEdge(this.pos.get())) {
                    console.log(this.thumbnailSurf.getContent())
                    this._eventOutput.emit('outputItem', this.thumbnailSurf.getContent());
                    this.removeUsedModel();
                } else {
                    this.addASurf(this.thumbnailSurf.getContent(),[this.pos.get()[0]-THUMBNAILSIZE/2,this.pos.get()[1] - THUMBNAILSIZE/2]);
                    this.newItem = false;
                }
            }
            this.renderController.hide();
        }.bind(this));
    }

    function _setupEvents(){
        this._eventOutput.on('outputItem',this.onOutputItem.bind(this));
    }

    TwoScreen2.prototype.isEdge = function(pos){
        return (
            (pos[0] < DETECTIONAREA) || (pos[0] > window.innerWidth-DETECTIONAREA) ||
                (pos[1] < DETECTIONAREA) || (pos[1] > window.innerHeight-DETECTIONAREA)
            )
    };

    TwoScreen2.prototype.onOutputItem = function(content){
        this.outputModel = this.eventsCollection.create({
            content: content
        });
        setTimeout(function(){this.eventsCollection.remove(this.outputModel)}.bind(this),2000);

    };

    TwoScreen2.prototype.setThumbnailContent = function(){
        this.inputModel = this.getMatchModel();
        this.thumbnailSurf.setContent(this.inputModel.get('content'));
    };
    
    TwoScreen2.prototype.getMatchModel = function(){
        return this.eventsCollection.models[0];
    };

    TwoScreen2.prototype.shuffleArray = function(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    TwoScreen2.prototype.removeUsedModel = function(){
        this.eventsCollection.remove(this.inputModel)
    }

    module.exports = TwoScreen2;


});
