define(function(require, exports, module) {
    // import dependencies
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var SModifier = require('famous/modifiers/StateModifier');


    function RotateRight() {

        View.call(this);

        this.outline = new Surface({
            size: [undefined, undefined],
            content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
            properties: {
                lineHeight: '200px',
                textAlign: 'center',
                backgroundColor: 'yellow'
            }
        });

        var outlineModifier = new SModifier({
            origin: [0.5, 0.5]
        });

        this._add(outlineModifier).add(this.outline);

    }

    RotateRight.prototype = Object.create(View.prototype);
    RotateRight.prototype.constructor = RotateRight;

    module.exports = RotateRight;


});
