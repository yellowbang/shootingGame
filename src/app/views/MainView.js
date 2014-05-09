define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var PhysicsEngine = require("famous/physics/PhysicsEngine");
    var Drag = require("famous/physics/forces/Drag");     //spring effect
    var Wall = require("famous/physics/constraints/Wall");
    var Collision = require("famous/physics/constraints/Collision");
    var ContainerSurface = require("famous/surfaces/ContainerSurface");

    var Walls = require('app/controller/Walls');

    var PlayerSurface = require('app/views/PlayerSurface');
    var AppConstant = require('app/Constant');

    function MainView(options){
        //TODO Bon
        window.mm = this;

        View.apply(this, arguments);

        this.physicsEngine = new PhysicsEngine();
        this.collection = options.collection;
        _init.call(this);
        _setupCollision.call(this);
        _setupFriction.call(this);
        _setupEvents.call(this);

    }

    MainView.prototype = Object.create(View.prototype);
    MainView.prototype.constructor = MainView;

    function _init(){

        this.players = [];
        this.container = new ContainerSurface({
            size:[undefined,undefined]
        });

        this._add(this.container);
        this.container.add(this.physicsEngine);

    }

    function _setupFriction(){

        this.drag = new Drag({
            strength : 0.001,
            forceFunction : Drag.FORCE_FUNCTIONS.LINEAR
        });

        this.walls = new Walls(0, AppConstant.wallRestitution, Wall.ON_CONTACT.REFLECT).walls;

    }

    function _setupCollision(){
        this.collision = new Collision({
            restitution : AppConstant.collisionRestitution,
            drift: 1
        });
    }

    function _setupEvents(){
        this.collection.on('all',function(e,model,value){
//            console.log(e,model,value);
            switch (e){
                case 'add':
//                    console.log('add', model)
                    this.addPlayer(model);
                    break;
                case 'change:move':
                    if (value == [0,0]) return;
//                    console.log('move', model,value)
                    break;
                case 'change:bullet':
                    if (value == [0,0]) return;
//                    console.log('bullet', model,value)
                    break;
            }
        }.bind(this));
    }

    MainView.prototype.applyForces = function(){
        this.physicsEngine.attach(this.drag, _.last(this.players));
        this.physicsEngine.attach(this.walls, _.last(this.players));
        if (this.players.length <= 1) return;
        for (var i in _.first(this.players,this.players.length-1)){
            this.physicsEngine.attach(this.collision, _.last(this.players), _.first(this.players,this.players.length-1)[i]);
        }
//        this.physicsEngine.attach(this.collision, _.first(this.players,this.players.length-1), _.last(this.players));
    };

    MainView.prototype.addPlayer = function(particle){
        this['player'+particle.get('id')] = new PlayerSurface(this, this.physicsEngine, this.walls,{
            size:[AppConstant.playerDiameter,AppConstant.playerDiameter],
            model: particle
        });
        this['player'+particle.get('id')].player.pipe(this._eventOutput);
        this.players.push(this['player'+particle.get('id')].particle);
        this.applyForces();
    };



    module.exports = MainView;

});