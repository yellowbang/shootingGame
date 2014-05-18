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

    var TwoScreenItem = require('test/twoScreen/item');
    var CardCollection = require('test/twoScreen/models/CardCollection');
    var EventCollection = require('test/twoScreen/models/EventCollection');

    var SurfURL = "https://flickering-fire-5114.firebaseio.com/twoScreen";
    var EventsURL = "https://flickering-fire-5114.firebaseio.com/twoScreenEvents";

    var ThumbnailSize = 50;

    function TwoScreen() {
        window.TT = Transform;
        window.two = this;
        View.call(this);

        _setupCollection.call(this);
        _setupCollectionEvent.call(this);
        _setupReceiveSurf.call(this);

    }


    TwoScreen.prototype = Object.create(View.prototype);
    TwoScreen.prototype.constructor = TwoScreen;

    function _setupCollection(){
        this.eventsCollection = new EventCollection([],{
            firebase: EventsURL
        });

        this.cardCollection = new CardCollection([], {
            firebase: SurfURL
        });
//        this.defaultCollection();
        this.cardCollection.on('all', function(e,model,collection){
            switch (e){
                case 'add':
                    _addASurf.call(this,model);
                    break;
            }
        }.bind(this));


    }

    function _setupCollectionEvent(){
        this.eventsCollection.on('all',function(e,model,value){
            switch (e){
                case 'add':
                    if (!this.cardSet && this.velocity) {
                        this.getBestMatch(this.matchVelocity(this.velocity));
                        this.updateThumbnailSurf();
                    }
                    break;
            }
        }.bind(this))
    }

    function _addASurf(model){
        var item = new TwoScreenItem(model.attributes,this.eventsCollection);
        this._add(item);
    }

    function _setupReceiveSurf(){
        this.leftSurf = new Surface({
            size:[undefined, undefined],
            properties:{
                backgroundColor:'grey'
            }
        });
        this._add(this.leftSurf);
        this.thumbnailSurf = new Surface({
            size:[ThumbnailSize,ThumbnailSize],
            properties:{
                backgroundColor:'orange'
            }
        });
        this.thumbnailSurfMod = new Modifier({
            opacity:1,
            transform: Transform.translate(window.innerWidth,window.innerHeight,0)
        });
        this._add(this.thumbnailSurfMod).add(this.thumbnailSurf);

        this.pos = new Transitionable([0,0]);
        this.receiveSync = new GenericSync(function(){
            return this.pos.get();
        }.bind(this), {syncClasses:[TouchSync]});

        this.leftSurf.pipe(this.receiveSync);

        this.receiveSync.on('start', function(data) {
            this.cardSet = false;
            this.pos.set([data.clientX, data.clientY]);
        }.bind(this));
        this.checkVelocity = 0;
        this.receiveSync.on('update', function(data) {
            this.pos.set(data.position);
            this.checkVelocity++;
            if (this.checkVelocity == 10){
                this.velocity = data.velocity;
                this.bestMatchModel = this.getBestMatch(this.matchVelocity(data.velocity));
                if (this.bestMatchModel){

                    this.updateThumbnailSurf();
                }
            }
            this.thumbnailSurfMod.setOpacity(1);
            this.thumbnailSurfMod.setTransform(Transform.translate(this.pos.get()[0]-ThumbnailSize/2,this.pos.get()[1]-ThumbnailSize/2,0));
        }.bind(this));

        this.receiveSync.on('end', function() {
            this.checkVelocity = 0;
            this.thumbnailSurfMod.setTransform(Transform.translate(this.pos.get()[0]-ThumbnailSize/2,window.innerHeight, 0),{duration:1000});
            setTimeout(function(){this.thumbnailSurf.setProperties({backgroundColor:'orange'})}.bind(this),1100);
//            setTimeout(function(){this.thumbnailSurfMod.setOpacity(0)}.bind(this),1000);
        }.bind(this));
    }

    TwoScreen.prototype.matchVelocity = function(v){
        var matchIndex = -1;
        var theDifferences = [];
        this.eventsCollection.each(function(model){
            // calculate the angle in degree

            var angle = Math.atan(model.get('velocity')[1]/model.get('velocity')[0])/Math.PI*180;
            var theAngle = Math.atan(v[1]/v[0])/Math.PI*180;
            theDifferences.push(Math.abs(angle - theAngle)|| 999);
            if (theDifferences.length == 1 || _.union(theDifferences).length != 1) {
                matchIndex = theDifferences.indexOf(_.min(theDifferences));
            }
        }.bind(this));
        return matchIndex;
    };

    TwoScreen.prototype.getBestMatch = function(index){
        this.bestMatchModel = _.clone(this.eventsCollection.models[index])
    };

    TwoScreen.prototype.updateThumbnailSurf = function(){
        this.cardSet = true;
        var theColor = this.bestMatchModel.get('color');
        this.thumbnailSurf.setProperties({backgroundColor: theColor});
    };

    TwoScreen.prototype.defaultCollection = function(){
        this.cardCollection.create({
            color: 'green',
            initX: 0,
            initY: 0
        });
        this.cardCollection.create({
            color: 'yellow',
            initX: 100,
            initY: 0
        });
        this.cardCollection.create({
            color: 'blue',
            initX: 200,
            initY: 0
        });
    };

    module.exports = TwoScreen;


});
