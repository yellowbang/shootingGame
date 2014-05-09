define(function(require, exports, module) {
    var Wall = require("famous/physics/constraints/Wall");
    var AppConstant = require('app/Constant');

    function Walls(size, restitution, onContact){

        // size is based on the window size
        // plus number for bigger
        // minus for smaller

        function setWall(normal, distance){
            return new Wall({
                normal: normal,
                distance: distance,
                restitution: restitution,
                drift:0,
                onContact: onContact
            })
        }
        this.wallUp = setWall([0,-1,0], window.innerHeight + size);
        this.wallDown = setWall([0,1,0], 0 + size);
        this.wallLeft = setWall([-1,0,0], window.innerWidth + size);
        this.wallRight = setWall([1,0,0], 0 + size);

        this.walls = [this.wallUp,this.wallDown,this.wallLeft,this.wallRight];

    }

    module.exports = Walls;

});