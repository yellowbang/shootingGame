define(function(require, exports, module) {

    var Surface = require("famous/core/Surface");
    var RenderNode = require("famous/core/RenderNode");
    var Modifier = require("famous/core/Modifier");
    var Transform = require("famous/core/Transform");
    var RenderController = require('famous/views/RenderController');
    var Circle = require('famous/physics/bodies/Circle');
    var Vector = require('famous/math/Vector');

    var BulletSurface = require('app/views/BulletSurface');
    var AppConstant = require('app/Constant');

    function PlayerSurface(context, physicsEngine, walls, options){

        //TODO Bon
        window.ff=this;

        this.context = context;
        this.renderController = new RenderController();
//        this.context.add(this.renderController)
        this.renderNode = new RenderNode();
        this.renderController.show(this.renderNode);
        this.physicsEngine = physicsEngine;
        this.walls = walls;
        this.model = options.model;
        this.size = options.size;

        this.moveVector = new Vector();
        this.bulletVector = new Vector();

        _initParticle.call(this);
        _syncEvent.call(this);

    }

    function _initParticle (){
        this.player = new Surface({
            size: this.size,
            properties:{
                borderRadius: this.size[0]+'px',
                backgroundColor: AppConstant.health[Math.max(this.model.get('health'),0)]
            }
        });
        this.renderNode.add(this.player);
        this.playerMod = new Modifier({
            transform:Transform.translate(-this.size[0]/2,-this.size[0]/2,0)
        });

        this.pp = new Vector(Math.random() * window.innerWidth, Math.random() * window.innerHeight,0);

        this.particle = new Circle({
            mass : 1,
            radius : this.size[0]/2,
            position : this.pp,
            velocity : [0,0,0],
            model: this.model
        });
        this.physicsEngine.addBody(this.particle);
        this.context._add(this.particle).add(this.playerMod).add(this.renderController);
    }

    function _syncEvent(){
        this.model.on('all',function(e,model,value){
            switch (e){
                case 'change:move':
                    if (value.x == 0 && value.y == 0) return;
                    this.playerMove(value);
                    break;
                case 'change:bullet':
                    if (value.x == 0 && value.y == 0) return;
                    this.fireBullet(value);
                    break;
                case 'change:health':
                    this.playerOnHit(value);
                    break;
                case 'change:name':
                    this.setAvatar();
                    break;
                case 'remove':
                    this.playerDie();
                    break;
            }
        }.bind(this));
    }

    PlayerSurface.prototype.playerMove = function(value){
        this.moveVector.set(_.values(value));
        this.particle.applyImpulse(this.moveVector.div(300));
    };
    PlayerSurface.prototype.fireBullet = function(fire){
        this.bulletVector.set(_.values(fire));
        new BulletSurface(this.particle, this.context,this.physicsEngine, new Vector(this.particle.getPosition()),this.bulletVector.normalize(AppConstant.bulletSpeed));
    };
    PlayerSurface.prototype.playerOnHit = function(health){
        if (health>0){
            this.player.setProperties({backgroundColor: AppConstant.health[health]});
        } else {
            this.player.setProperties({backgroundColor: 'black'});
            this.playerDie();
        }
    };

    PlayerSurface.prototype.playerDie = function(){
        this.renderController.hide();
        this.physicsEngine.removeBody(this.particle);
    };

    PlayerSurface.prototype.setAvatar = function(){
        var name = (this.model.get('name') != 'unknown')? this.model.get('name'):'';
        this.player.setContent(['<div class="player-avatar">',
            name,
            '</div>'].join(''));
    };

    module.exports = PlayerSurface;

});