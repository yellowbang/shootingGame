define(function(require, exports, module) {

    var Surface = require("famous/core/Surface");
    var Modifier = require("famous/core/Modifier");
    var Transform = require("famous/core/Transform");
    var Circle = require('famous/physics/bodies/Circle');
    var Vector = require('famous/math/Vector');
    var Collision = require("famous/physics/constraints/Collision");
    var Wall = require("famous/physics/constraints/Wall");

    var Walls = require('app/controller/Walls');

    var AppConstant = require('app/Constant');

    function BulletSurface(player,context, physicsEngine, position, bullet){

        //TODO Bon
        window.bl=this;

        this.player = player;
        this.context = context;
        this.physicsEngine = physicsEngine;
        this.position = position;
        this.bulletDirection = bullet;

        _setupBullet.call(this);
        _setupWalls.call(this);
        _setupCollision.call(this);
        _setupHitEvent.call(this);
    }

    function _setupBullet(){
        this.bullet = new Surface ({
            size: [AppConstant.bulletDiameter, AppConstant.bulletDiameter],
            properties:{
                backgroundColor:'black',
                borderRadius: AppConstant.bulletDiameter + 'px'
            }
        });
        this.bulletMod = new Modifier({
            transform:Transform.translate(-AppConstant.bulletDiameter/2,-AppConstant.bulletDiameter/2,0)
        });
        this.particle = new Circle({
            mass : 1,
            radius : AppConstant.bulletDiameter/2,
            position : this.position,
            velocity : this.bulletDirection
        });
        this.particle.isBody = false; // make bullet to be particles but not bodies
        this.physicsEngine.addBody(this.particle);
        this.context._add(this.particle).add(this.bulletMod).add(this.bullet);
    }

    function _setupWalls(){
        this.walls = new Walls(AppConstant.bulletDiameter, -1, Wall.ON_CONTACT.REFLECT).walls;
        this.physicsEngine.attach(this.walls, this.particle);
    }

    function _setupCollision(){
        this.collision = new Collision({
            restitution : 0,
            drift: 1
        });
        var otherBodies = _.filter(this.physicsEngine.getBodies(),function(body,index){return index != _.indexOf(this.physicsEngine.getBodies(),this.player)}.bind(this));
        if (otherBodies.length==0) return;
        for (var ii in otherBodies){
            this.physicsEngine.attach(this.collision, otherBodies[ii], this.particle);
        }
//        this.physicsEngine.attach(this.collision, otherBodies, this.particle)

    }

    function _setupHitEvent(){
        this.collision.on('collision', this.onHit.bind(this));
    }

    BulletSurface.prototype.onHit = function(event){
        var playerIndex = _.indexOf(this.physicsEngine.getBodies(),event.target);
        var bulletIndex = _.indexOf(this.physicsEngine.getParticles(),event.source);
        if (bulletIndex != -1) {
            this.physicsEngine.removeBody(this.physicsEngine.getParticles()[bulletIndex]);
            this.bullet.setProperties({display:"none"});   // TODO:Important need to remove it from dom tree
        }
        if (playerIndex != -1) {
           this.physicsEngine._bodies[playerIndex].model.set('health',Math.max(this.physicsEngine._bodies[playerIndex].model.get('health')-1,0))
        }
    };

    module.exports = BulletSurface;

});