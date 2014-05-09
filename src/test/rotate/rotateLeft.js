define(function(require, exports, module) {
    // import dependencies
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var SModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');

    function RotateLeft() {

        View.call(this);

        var outline = new Surface({
            size: [200, 200],
            content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
            properties: {
                lineHeight: '200px',
                textAlign: 'center',
                backgroundColor: 'yellow'
            }
        });

        var outlineModifier = new SModifier({
            origin: [1, 0.5],
            transform: Transform.translate(-window.innerWidth,0)
        });

        this._add(outlineModifier).add(outline);

    }

    RotateLeft.prototype = Object.create(View.prototype);
    RotateLeft.prototype.constructor = RotateLeft;

    module.exports = RotateLeft;


});
