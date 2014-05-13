define(function(require, exports, module) {
    // import dependencies
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Spring = require('famous/physics/forces/Spring');
    var VectorField = require('famous/physics/forces/VectorField');
    var Vector = require('famous/math/Vector');

    var Ring3DItem = require('test/Ring3D/item');

    var Constant = require('test/Ring3D/Constant');

    function SurfacesNet(options) {

        View.apply(this, arguments);
        this.physicsEngine = new PhysicsEngine();

        _setupItems.call(this);
    }

    SurfacesNet.prototype = Object.create(View.prototype);
    SurfacesNet.prototype.constructor = SurfacesNet;

    SurfacesNet.DEFAULT_OPTIONS = {

    };

    function _setupItems(){
        var item = new Ring3DItem({physicsEngine: this.physicsEngine});
        var spring = new Spring ({
            dampingRatio : 0.,
            forceFunction: Spring.FORCE_FUNCTIONS.HOOK,
            period: 10000,
            anchor: new Vector(300,300,0)
        });
        var gravity = new VectorField({
            field: VectorField.FIELDS.POINT_ATTRACTOR,
            strength: 2 ,
            position: new Vector(300,300,0)
        });

        this.physicsEngine.attach(gravity, item.particle);
        this.add(item);
    }

    module.exports = SurfacesNet;


});
