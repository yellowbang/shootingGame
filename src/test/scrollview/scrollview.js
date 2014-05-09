define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Scrollvieww = require('famous/views/Scrollview');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var Transitionable = require('famous/transitions/Transitionable');

    var Item = require('test/scrollview/item');

    function Scrollview() {
        window.TT = Transform;
        window.s = this;
        View.call(this);

        this.sequence = [];

        for (var i = 0; i <10; i++){
            var item = new Item();
            item.pipe(this._eventOutput);
            this.sequence.push(item);
        }

        this.scrollview = new Scrollvieww({
            direction:1
        });
        this.scrollview.sequenceFrom(this.sequence);

        this._eventOutput.pipe(this.scrollview);
        this._add(this.scrollview);

        this.scrollview.sync.on('start',function(){console.log('dsfdsf')})
    }


    Scrollview.prototype = Object.create(View.prototype);
    Scrollview.prototype.constructor = Scrollview;

    Scrollview.prototype.events = function(){

    };

    module.exports = Scrollview;


});
