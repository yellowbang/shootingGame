/*globals define*/
define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var mainContext = Engine.createContext();
    mainContext.setPerspective(0);

    var Rotate = require('test/rotate/rotate');
    var Rotate3D = require('test/rotate/rotate3D');
    var Scrollview = require('test/scrollview/scrollview');
    var Drag = require('test/drag/Drag');
    var SizeModify = require('test/sizeModify/sizeModify');
    var PE = require('test/physicsEngine/physicsEngineTest');
    var TwoScreen = require('test/twoScreen/twoScreen');
    var RenderController = require('test/RenderController/renderController');
    var SurfacesNet = require('test/SurfacesNet/surfacesNet');
    var Ring3D = require('test/Ring3D/Ring3D');

    var Game = require('app/Game');

    window.cont = mainContext;

    // your app here
//    var test = new Rotate();
//    var test = new Rotate3D();
    var test = new Scrollview();
//    var test = new Drag();
//    var test = new SizeModify();
//    var test = new PE();
    var test = new TwoScreen();
//    var test = new RenderController();

//    var test = new Game();
//    var test = new SurfacesNet({Dimension : [9,9], ImageURL : "src/test/surfacesNet/assets/feather.jpg", ImageOriginalSize : [800, 600], ItemSpacing : 10});
//    var test = new Ring3D();

    mainContext.add(test);

});
