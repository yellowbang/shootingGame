define(function(require, exports, module) {
    var Engine     = require("famous/core/Engine");
    var Surface    = require("famous/core/Surface");
    var Modifier = require('famous/core/Modifier');
    var RotateSync = require("famous/inputs/RotateSync");
    var ScaleSync = require("famous/inputs/ScaleSync");
    var TouchSync = require("famous/inputs/TouchSync");
    var Transform = require('famous/core/Transform');
    var Transitionable = require('famous/transitions/Transitionable');

    var mainContext = Engine.createContext();

    var start = 0;
    var update = 0;
    var end = 0;
    var direction = "";
    var angle = new Transitionable(0);
    var scale = new Transitionable(1);
    var Y_dir = new Transitionable(0);
    var delta = 0;

    var rotateSync = new RotateSync();
    var ScaleSync = new ScaleSync();
    var TouchSync = new TouchSync();

    Engine.pipe(rotateSync);
    Engine.pipe(ScaleSync);
    Engine.pipe(TouchSync);

    var contentTemplate = function() {
        return "<div>Start Count: " + start + "</div>" +
            "<div>End Count: " + end + "</div>" +
            "<div>Update Count: " + update + "</div>" +
            "<div>Direction: " + direction + "</div>" +
            "<div>Delta: " + delta.toFixed(3) + "</div>" +
            "<div>Angle: " + angle.get().toFixed(3) + "</div>" +
            "<div>Scale: " + scale.get().toFixed(3) + "</div>" +
            "<div>Y_dir: " + Y_dir.get().toFixed(3) + "</div>";
    };

    var surface = new Surface({
        size: [200, 200],
        classes: ['grey-bg'],
        content: contentTemplate(),
        properties:{
            background: 'yellow'
        }
    });

    var mod = new Modifier({
        origin:[0.5,0.5]
    });
    var mod2 = new Modifier({
        origin:[0.5,0.5]
    });

    mod.transformFrom(function(){
        return Transform.rotateZ(angle.get())
    }.bind(this));

    mod2.transformFrom(function(){
        return Transform.scale(scale.get(),scale.get())
    }.bind(this));

    rotateSync.on("start", function() {
        start++;
        angle.set(0);
        surface.setContent(contentTemplate());
    });

    rotateSync.on("update", function(data) {
        update++;
        direction = data.velocity > 0 ? "Clockwise" : "Counter-Clockwise";
        angle.set(data.angle);
        delta = data.delta;
        surface.setContent(contentTemplate());
    });

    rotateSync.on("end", function() {
        end++;
        surface.setContent(contentTemplate());
    });

    ScaleSync.on("start", function() {
        scale.set(1)
    });

    ScaleSync.on("update", function(data) {
        scale.set(data.scale);
    });

    TouchSync.on("start", function() {
        Y_dir.set(0)
    });

    TouchSync.on("update", function(data) {
        Y_dir.set(data.position[1]);
        surface.setContent(contentTemplate());
    });


    mainContext.add(surface);
});