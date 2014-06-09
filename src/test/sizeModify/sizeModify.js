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

    function SizeModify() {
        window.TT = Transform;
        window.SM = this;
        View.call(this);

        this.surf = new Surface({
            size:[100,100],
            content: 'dsfdfsdfsdfsfsdfsfsefeifjowiejfwoeifjeiwojfoiewjfoiwejifowe',
            properties:{
                backgroundColor:'yellow',
                color: 'black',
                overflow: 'hidden'
            }
        });

        this.mod = new Modifier({
            size:[50,50]
        });

        this._add(this.mod).add(this.surf);

        this.pos = new Transitionable([0,0]);
        this.sync = new GenericSync(function(){
            return this.pos.get();
        }.bind(this), {syncClasses:[MouseSync]});

        this.surf.pipe(this.sync);
        this.sync.on('start', function() {
            this.pos.set([0,0]);
        }.bind(this));
        this.sync.on('update', function(data) {
            this.pos.set(data.position);
            console.log(data.position)
            this.mod.setSize(this.pos.get());
//            console.log(this.pos.get())
//            this.mod.setTransform(Transform.scale(this.pos.get()[0]/100,this.pos.get()[1]/100,1))
        }.bind(this));
        this.sync.on('end', function(data) {
        }.bind(this));
    }


    SizeModify.prototype = Object.create(View.prototype);
    SizeModify.prototype.constructor = SizeModify;

    SizeModify.prototype.events = function(){

    };

    module.exports = SizeModify;


});
