define(function(require, exports, module) {
    var Transform           = require('famous/core/Transform');
    var View                = require('famous/core/View');
    var Surface             = require('famous/core/Surface');
    var Modifier             = require('famous/core/Modifier');
    var EventHandler        = require('famous/core/EventHandler');
    var GenericSync         = require('famous/inputs/GenericSync');
    var TouchSync           = require('famous/inputs/TouchSync');
    var Transitionable      = require('famous/transitions/Transitionable');

    function PlayerView(options) {

        window.player = this;
        View.apply(this, arguments);

        this.model = options.model;

        _setupController.call(this);
        _setupDirectionEvent.call(this);
        _setupGunEvent.call(this);
    }

    PlayerView.prototype = Object.create(View.prototype);
    PlayerView.prototype.constructor = PlayerView;

    PlayerView.DEFAULT_OPTIONS = {

    };

    var _setupController = function() {
        this.directionController = new Surface({
            size:[window.innerWidth/2, window.innerHeight],
            properties:{
                backgroundColor: 'yellow'
            }
        });
        this._add(this.directionController);

        this.gunController = new Surface({
            size:[window.innerWidth/2, window.innerHeight],
            properties:{
                backgroundColor: 'blue'
            }
        });
        this.gunControllerMod = new Modifier({
            origin:[1,0]
        });
        this._add(this.gunControllerMod).add(this.gunController);
    };

    var _setupDirectionEvent = function(){
        this.directionPos = new Transitionable([0,0]);
        this.directionSync = new GenericSync(function(){
            return this.directionPos.get();
        }.bind(this), {syncClasses:[TouchSync]});

        this.directionController.pipe(this.directionSync);
        this.directionSync.on('start', function() {
            this.directionPos.set([0,0]);
        }.bind(this));
        this.directionSync.on('update', function(data) {
            this.directionPos.set(data.position);
        }.bind(this));
        this.directionSync.on('end', function(data) {
            this.directionPos.set(data.position);
            if (!this.directionPos.get()) this.directionPos.set([0,0]);
            this.model.set('move', {x:this.directionPos.get()[0],y:this.directionPos.get()[1], z:0});
        }.bind(this));
    };

    var _setupGunEvent = function(){
        this.gunPos = new Transitionable([0,0]);
        this.gunSync = new GenericSync(function(){
            return this.gunPos.get();
        }.bind(this), {syncClasses:[TouchSync]});

        this.gunController.pipe(this.gunSync);
        this.gunSync.on('start', function() {
            this.gunPos.set([0,0]);
        }.bind(this));
        this.gunSync.on('update', function(data) {
            this.gunPos.set(data.position);
            console.log(data.position, data.delta);
        }.bind(this));
        this.gunSync.on('end', function(data) {
            this.gunPos.set(data.position);
            if (!this.gunPos.get()) this.gunPos.set([0,0]);
            this.model.set('bullet', {x:this.gunPos.get()[0],y:this.gunPos.get()[1], z:0});
        }.bind(this));
    };

    module.exports = PlayerView;
});
