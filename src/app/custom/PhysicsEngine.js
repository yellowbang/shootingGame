define(function(require, exports, module) {
    var PhysicsEngine = require('famous/physics/PhysicsEngine');

    function PhysicsEngineView() {
        PhysicsEngine.apply(this, arguments);
    }

    PhysicsEngineView.prototype = Object.create(PhysicsEngine.prototype);
    PhysicsEngineView.prototype.constructor = PhysicsEngine;

    PhysicsEngineView.prototype.detachFrom = function detachFrom(id, target) {
        var boundAgent = _getBoundAgent.call(this, id);

        // TODO:Bon
        if (!boundAgent) return;
        if (boundAgent.source === target) this.detach(id);
        else {
            var targets = boundAgent.targets;
            var index = targets.indexOf(target);
            if (index > -1) targets.splice(index,1);
        }
    };



    module.exports = PhysicsEngineView  ;
});