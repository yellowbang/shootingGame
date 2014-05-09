/*globals define*/
define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);

    var Rotate = require('test/rotate/rotate');
    var Scrollview = require('test/scrollview/scrollview');
    var Drag = require('test/drag/Drag');
    var SizeModify = require('test/sizeModify/sizeModify');
    var PE = require('test/physicsEngine/physicsEngineTest');
    var TwoScreen = require('test/twoScreen/twoScreen');

    var Game = require('app/Game');

    window.cont = mainContext;

    // your app here
//    var test = new Rotate();
//    var test = new Scrollview();
//    var test = new Drag();
//    var test = new SizeModify();
//    var test = new PE();
//    var test = new Game();
    var test = new TwoScreen();

    mainContext.add(test);

});
