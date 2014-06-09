define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ContainerSurface = require('famous/surface/ContainerSurface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');

    function BlockView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    BlockView.prototype = Object.create(View.prototype);
    BlockView.prototype.constructor = BlockView;

    BlockView.DEFAULT_OPTIONS = {};

    function _createViews() {

    }

    function _setListeners() {

    }

    module.exports = BlockView;
});