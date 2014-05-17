define(function(require, exports, module) {
    var Transform           = require('famous/core/Transform');
    var View                = require('famous/core/View');
    var RenderController    = require('famous/views/RenderController');
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var EventHandler        = require('famous/core/EventHandler');
    var GenericSync         = require('famous/inputs/GenericSync');
    var TouchSync           = require('famous/inputs/TouchSync');
    var Transitionable      = require('famous/transitions/Transitionable');

    function PlayerViewSetting(options) {

        window.playerSetting = this;
        View.apply(this, arguments);

        this.model = options.model;

        _setupView.call(this);
        _setupEvent.call(this);
    }

    PlayerViewSetting.prototype = Object.create(View.prototype);
    PlayerViewSetting.prototype.constructor = PlayerViewSetting;

    PlayerViewSetting.DEFAULT_OPTIONS = {

    };

    var _setupView = function(){
        this.renderController = new RenderController();
        this.add(this.renderController);
        _setupSettingButton.call(this);
        _setupNameBar.call(this);
    };

    var _setupSettingButton = function() {
        this.onSettingMode = false;
        this.settingSurf = new Surface({
            size:[40,40],
            content: ['<div><i class="fa fa-cog"></div>'].join(''),
            classes: ['bon-surf']
        });
        this.settingSurfMod = new Modifier({
            origin:[0.5,0]
        });
        this.add(this.settingSurfMod).add(this.settingSurf);
    };

    var _setupNameBar = function() {
        this.nameSurf = new Surface({
            size:[150,40],
            content:['<div><input class="setting-name" placeholder = "Your Name"></div>'].join('')
        });
    };

    var _setupEvent = function(){
        this.settingSurf.on('click', this.settingOnClick.bind(this));
        this.nameSurf.on('keypress', this.setPlayerName.bind(this));
    };

    PlayerViewSetting.prototype.settingOnClick = function(){
        this.onSettingMode = !this.onSettingMode;
        if (this.onSettingMode){
            this.renderController.show(this.nameSurf);
        } else {
            this.renderController.hide();
        }
    };

    PlayerViewSetting.prototype.setPlayerName = function(e){
        if (e.keyCode == 13){
            var content = document.getElementsByClassName('setting-name')[0].value;
            this.model.set('name', content);
            this.settingOnClick();
        }
    };
    module.exports = PlayerViewSetting;
});
