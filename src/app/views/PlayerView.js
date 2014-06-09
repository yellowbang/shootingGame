define(function(require, exports, module) {
    var Transform           = require('famous/core/Transform');
    var View                = require('famous/core/View');
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var EventHandler        = require('famous/core/EventHandler');
    var GenericSync         = require('famous/inputs/GenericSync');
    var TouchSync           = require('famous/inputs/TouchSync');
    var Transitionable      = require('famous/transitions/Transitionable');

    var PlayerSettingView   = require('app/views/PlayerViewSetting');
    GenericSync.register({
        touch : TouchSync
    });

    function PlayerView(options) {

        window.player = this;
        View.apply(this, arguments);

        this.model = options.model;

        _setupController.call(this);
        _setupSettingView.call(this);
        _setupDirectionEvent.call(this);
        _setupGunEvent.call(this);
        _setupModelEvent.call(this);
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

    var _setupSettingView = function(){
        var settingView = new PlayerSettingView({model:this.model});
        this.add(settingView);
    };

    var _setupDirectionEvent = function(){
        this.setControllerSync('direction', 'move');
    };

    var _setupGunEvent = function(){
        this.setControllerSync('gun','bullet');
    };

    var _setupModelEvent = function(){
        this.model.on('all', function(e,model,value){
            switch (e){
                case 'change:health':
                    if (value == 0) {
                        this.playerDie();
                    } else if (value == 3){
                        this.playerRevive();
                    }
                    break;
            }
        }.bind(this));
    };

    PlayerView.prototype.setControllerSync = function(name, key){
        this[name+'Pos'] = new Transitionable([0,0]);
        this[name+'Sync'] = new GenericSync(function(){
            return this[name+'Pos'].get();
        }.bind(this), {syncClasses:[TouchSync]});

        this[name+'Controller'].pipe(this[name+'Sync']);

        this[name+'Sync'].on('start', function() {
            this[name+'Pos'].set([0,0]);
            this[name+'timeStart'] = Date.now();
        }.bind(this));

        this[name+'Sync'].on('update', function(data) {
            this[name+'Pos'].set(data.position);
        }.bind(this));

        this[name+'Sync'].on('end', function(data) {
            this[name+'Pos'].set(data.position);
            if (!this[name+'Pos'].get()) this[name+'Pos'].set([0,0]);
            this[name+'timeEnd'] = Date.now();
            this[name+'duration'] = (this[name+'timeEnd'] - this[name+'timeStart']) / 30;
            this.model.set(key, {x:this[name+'Pos'].get()[0]/this[name+'duration'],y:this[name+'Pos'].get()[1]/this[name+'duration'], z:0});
        }.bind(this));
    };

    PlayerView.prototype.playerRevive = function(){
        this.directionController.pipe(this.directionSync);
        this.gunController.pipe(this.gunSync);
    };

    PlayerView.prototype.playerDie = function(){
        this.directionController.unpipe(this.directionSync);
        this.gunController.unpipe(this.gunSync);
    };

    module.exports = PlayerView;
});
