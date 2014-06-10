define(function(require, exports, module) {
    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
//    var Modifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Timer = require('famous/utilities/Timer');

    function ScaleModify() {
        window.TT = Transform;
        window.SM = this;
        View.call(this);

        this.surf = new Surface({
            size:[2000,2000],
            content: '<div style="font-size: 140px">dsfdfsdfsdfsfsdfsfsefeifjowiejfwoeifjeiwojfoiewjfoiwejifowe</div>',
            properties:{
                backgroundColor:'yellow',
                color: 'black',
                overflow: 'hidden'
            }
        });

        this.mod = new Modifier({
            origin:[0.5,0.5],
            transform: Transform.scale(0.05,0.05)
        });

        this.add(this.mod).add(this.surf);
        Timer.setTimeout(function(){
            this.mod.setTransform(Transform.scale(0.1,0.1,0.1),{duration:500})
        }.bind(this),1000)
    }


    ScaleModify.prototype = Object.create(View.prototype);
    ScaleModify.prototype.constructor = ScaleModify;

    ScaleModify.prototype.events = function(){

    };

    module.exports = ScaleModify;


});
