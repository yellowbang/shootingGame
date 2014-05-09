define(function(require, exports, module) {
    // import dependencies
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var SModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Transitionable   = require('famous/transitions/Transitionable');

    var Height = 200;

    function Item() {

        View.call(this);

        this.surface = new Surface({
            size: [undefined, Height],
            content: '<img width="200" src="' + 'src/images/famous_symbol_transparent.png' + '"/>',
            properties: {
                lineHeight: '200px',
                textAlign: 'center',
                backgroundColor: 'yellow'
            }
        });

        this.transform = new Transitionable([0,0,0]);
        this.size = new Transitionable(Height);

        this.surfaceMod = new Modifier();
        this.surfaceMod.transformFrom(function(){
            var value = this.transform.get();
            return Transform.translate(value[0],value[1],value[2]);
        }.bind(this));

        this.surfaceMod.sizeFrom(this.getSize());

        this._add(this.surfaceMod).add(this.surface);

        this.surface.pipe(this._eventOutput);

        this.surface.on('click',function(){
            this._eventOutput.emit('deleteSurface');
        }.bind(this));

        this._eventOutput.on('deleteSurface', function(){
            this.deleteItem()
        }.bind(this));

    }

    Item.prototype = Object.create(View.prototype);
    Item.prototype.constructor = Item;

    Item.prototype.getSize = function() {
        return [undefined, this.size.get()];
    };

    Item.prototype.deleteItem = function(cb) {
        this.transform.set([window.innerWidth + 100, 0, 0], {duration: 1000, curve: 'easeInOut'}, function() {
            this.size.set(0, {duration: 300, curve: 'easeOut'}, function() {
                if (cb) cb();
                this._eventOutput.emit('closed');
            }.bind(this));
        }.bind(this));
    };

    module.exports = Item;


});
