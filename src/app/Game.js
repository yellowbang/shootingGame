define(function(require, exports, module) {
    var View = require('famous/core/View');

    var PlayerView = require('app/views/PlayerView');
    var MainView = require('app/views/MainView');
    var PlayerCollection = require('app/models/PlayersCollection');

    var Helpers      = require('app/Helpers');

    var FirebaseURL = "https://shooting.firebaseio.com/testing/";


    function Game(){

        View.call(this);

        _init.call(this);
    }

    Game.prototype = Object.create(View.prototype);
    Game.prototype.constructor = Game;

    function _init(){
        this.playerCollection = new PlayerCollection([], {
            firebase: FirebaseURL
        });

        if (Helpers.isMobile()) {

            function generateUserId() {
                var userId = localStorage.getItem('user-id');
                if (!userId) {
                    userId = Date.now();
                    localStorage.setItem('user-id', userId);
                }
                return userId;
            }

            function loadPlayer(){
                this.player = this.playerCollection.where({id: userId})[0];
                if (!this.player) {
                    this.playerCollection.create({
                        id: userId
                    });
                    this.player = this.playerCollection.where({id: userId})[0];
                }
                this.view = new PlayerView({model: this.player});
            }

            var userId = generateUserId();

            this.playerCollection.once({
                "sync": loadPlayer.call(this)
            });

//            this.playerRef = new Firebase(FirebaseURL + '/' + userId);
//            this.playerRef.onDisconnect().remove();

        } else {
            this.view = new MainView({collection: this.playerCollection});
        }

        this.view.pipe(this._eventOutput);
        this._eventInput.pipe(this.view);
        this._add(this.view);

    }

    module.exports = Game;
});

