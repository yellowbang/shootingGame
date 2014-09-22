/*globals define*/
define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var mainContext = Engine.createContext();
    mainContext.setPerspective(800);

    var Rotate = require('test/rotate/rotate');
    var Rotate3D = require('test/rotate/rotate3D');
    var Triangle = require('test/rotate/Triangle');
    var Scrollview = require('test/scrollview/scrollview');
    var Drag = require('test/drag/Drag');
    var SizeModify = require('test/sizeModify/sizeModify');
    var scaleModify = require('test/sizeModify/scaleModify');
    var PE = require('test/physicsEngine/physicsEngineTest');
    var HangingSurface = require('test/physicsEngine/HangingSurface');
    var TwoScreen = require('test/twoScreen/twoScreen');
    var TwoScreen2 = require('test/twoScreen2/twoScreen2');
    var RenderController = require('test/RenderController/renderController');
    var SurfacesNet = require('test/SurfacesNet/surfacesNet');
    var Ring3D = require('test/Ring3D/Ring3D');
    var NElementsRotator = require('test/Ring3D/NElementsRotator');
    var JumpUpSurface = require('test/JumpUpSurface/JumpUpSurface');
    var SvgElements = require('test/svg/SvgElements');

    var Game = require('app/Game');

//    window.cont = mainContext;

    // your app here
//    var test = new Rotate();
//    var test = new Rotate3D();
//    var test = new NElementsRotator();
//    var test = new Triangle();
//    var test = new Scrollview();
//    var test = new ScrollviewOutput();
//    var test = new Drag();
//    var test = new SizeModify();
//    var test = new scaleModify();
//    var test = new PE();
//    var test = new HangingSurface({surfOneContent:'bonbonobn'});
//    var test = new TwoScreen();
//    var test = new TwoScreen2();
//    var test = new RenderController();
//    var test = new JumpUpSurface();
//    var test = new SvgElements();
//    var test = new rotateSync();

    var test = new Game();
//    var test = new SurfacesNet({Dimension : [7,7], ImageURL : "src/test/surfacesNet/assets/feather.jpg", ImageOriginalSize : [800, 600], ItemSpacing : 10});
//    var test = new Ring3D();

    mainContext.add(test);
//    var ScrollviewOutput = require('test/scrollview/scrollviewOutput');
//    var rotateSync = require('test/rotateSync/rotateSync');

});


// I used to do data analyse with Python when I was in Hawaii. My main work is to reduce
// and analyze the data from HST. So that I figure out the probabilities of astronomic
// objects. Now I am working as a intern in a startup company. What I am currently doing
// is web development in javascript. I have contributions in two recently laungch product.
// They are called beepe.me and happy chalk. You can find these on chrome store.

// Coding to me is a lot of fun. I taste the sweet when I was doing my research in Hawaii.
// I always do great in all my science classes. I enjoy solving problems. So I want
// to do programming.

// I can learn stuff very fast. For example, I didnot know javascript before. But I
// learn it with online tutorial. Now I have lots of contributions in the company.
// Another example. Do you hear about famo.us?

// I understand physics very well. And I have a 3D mind. I means I understand the 3D world
// well too. So I can make 3D animation easily.

// Language is my weakness. My mouth can not run as fast as my brain. Sometimes I am
// misunderstand by my colleague or friends. I am improving now.

// I am exploring myself and try to learn as much as I can in different environment.
// I always co-operate in a small group. And now I want to try to work with a big team
// and product some fancy products.

// I am 24 hours welcoming new challenges, because that is the only way to improve myself.
//

// I have something that I want to build. Every night after work I spend one or two hours
// for it. I have finished up a draft version.

