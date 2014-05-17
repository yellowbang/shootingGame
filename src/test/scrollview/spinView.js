define(function(require, exports, module) {
    // import dependencies
    var Scrollvieww = require('famous/views/Scrollview');
    var Field = require ('famous/physics/forces/VectorField');
    var Spring = require ('famous/physics/forces/Spring');
    var Vector = require('famous/math/Vector');

    function SpinView() {
        window.VV = Vector;
        window.spin = this;
        Scrollvieww.apply(this,arguments);
//        this.spring = new Spring({anchor: [200, 0, 0]});
        _setupSpinsForces.call(this);
    }


    SpinView.prototype = Object.create(Scrollvieww.prototype);
    SpinView.prototype.constructor = SpinView;

    function _setupSpinsForces(){
        this.field1 = new Field({
            direction: new Vector(1,0,0),
            strength:0.01
        });
        this.field2 = new Field({
            direction: new Vector(-1,0,0),
            strength:0.005
        });
    }

    SpinView.prototype.spinFunction = function(){
        this._physicsEngine.detachAll();
        var field1 = this._physicsEngine.attach(this.field1, this._particle);
        this.timeoutID = setTimeout(function(){
            this._physicsEngine.detach(field1);
            this._physicsEngine.attach(this.field2, this._particle);
            setTimeout(function(){
                this._physicsEngine.detachAll();
                this._eventInput.emit('end',{velocity:1})
            }.bind(this),this.options.spinDuration/2);
        }.bind(this),this.options.spinDuration/2);
    };

    SpinView.prototype.parallaxFunction = function(){
        this._physicsEngine.detachAll();
        this.setVelocity(0.1);
    };

    SpinView.prototype.startSpin = function(){
        this.parallaxFunction();
        setTimeout(function(){this.spinFunction();}.bind(this),this.options.parallaxDuration);
    };

    SpinView.prototype.stopSpin = function(){
        if (this.spinIntervalID) {
            if (this.timeoutID) {
                clearTimeout(this.timeoutID);
                this.timeoutID = null;
            }
            clearInterval(this.spinIntervalID);
            this.spinIntervalID = null;
            this._eventInput.emit('start',{});
            this._eventInput.emit('end',{velocity:0});
        }
    };

    module.exports = SpinView;


});
