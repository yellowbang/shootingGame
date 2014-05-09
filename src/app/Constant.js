define(function(require, exports, module) {

    var MouseSync = require('famous/inputs/mouseSync');
    var TouchSync = require('famous/inputs/touchSync');

    module.exports = {

        controlViewSize: [window.innerWidth, window.innerHeight],

        playerDiameter : 50,
        bulletDiameter : 10,
        health:['grey','red', 'yellow', 'green'],
        wallRestitution : 1,
        collisionRestitution : 0.95,
        collisionK : 0.1,

        deviceSync : (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))? TouchSync:MouseSync
    }

});