define(function(require, exports, module) {

    var Spring = require('famous/physics/forces/Spring');

    module.exports = {

        ItemSpringSetting : {
            dampingRatio : 0.6,
            forceFunction: Spring.FORCE_FUNCTIONS.FENE,
            period: 900
        },

        WallSpringSetting : {
            dampingRatio : 0.1,
            forceFunction: Spring.FORCE_FUNCTIONS.HOOK,
            length: 0,
            period: 2000
        }

    }

});