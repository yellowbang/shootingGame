define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');

    function dragView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    dragView.prototype = Object.create(View.prototype);
    dragView.prototype.constructor = dragView;

    dragView.DEFAULT_OPTIONS = {};

    function _createViews() {
        this.surf = new Surface({
            size:[100,100],
            properties:{
                backgroundColor:'blue'
            }
        });
        this.surfNode = new Modifier({
            transform:Transform.translate(0,0,0)
        });
        this.surfMod = new Modifier({
            origin:[0.5,0.4],
            transform:Transform.translate(0,0,3)
        });
        this.add(this.surfNode).add(this.surfMod).add(this.surf);
    }

    function _setListeners() {
        this.surf.on('click',function(){
            alert('surf1')
        }.bind(this));
    }

    module.exports = dragView;
});