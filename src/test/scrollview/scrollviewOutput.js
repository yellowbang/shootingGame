define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Scrollview = require('famous/views/Scrollview');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ViewSequence = require('famous/core/ViewSequence');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(500);

    var surfaces = [];
    var scrollview = new Scrollview({
        margin: 180,
        paginated: true
    });

    Engine.pipe(scrollview);

    var viewSequence = new ViewSequence({
        array: surfaces,
        loop: false
    });
    scrollview.sequenceFrom(viewSequence);

    var size = [150, 100];

    var centerModifier = new StateModifier({
        size: size,
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    mainContext.add(centerModifier).add(scrollview);

    for (var i = 0; i < 40; i++) {
        var surface = new Surface({
            size: size,
            content: 'Surface ' + i,
            properties: {
                textAlign: 'center',
                lineHeight: '100px',
                color: 'white',
                backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
            }
        });

        surfaces.push(surface);
    }


    scrollview.outputFrom(function(offset) {
        return Transform.moveThen([-size[0]/2,0,size[0]/2], Transform.rotateY(offset/size[1]*Math.PI/2));
//        return Transform.moveThen([0,-size[1]/2,size[0]*2], Transform.rotateX(offset*0.004));
    });
});
