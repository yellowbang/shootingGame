define(function(require, exports, module) {

    module.exports = {
        ThumbnailSize: 200,
        DetectionArea: 100,
        OutputArea: 50,
        DISPLAY_OBJECTS: [
//            ['<div class="default-circle1"></div>'].join(''),
//            ['<div class="default-square1"></div>'].join(''),
//            ['<div class="default-input" contenteditable="true">My secret words to you</div>'].join(''),
            ['<div class="to-do-list"><h3>To Do:</h3><ul><li class="to-do-item" contenteditable="true">Buy Milk</li><li class="to-do-item" contenteditable="true">Soccer</li></ul></div>'].join(''),
//            ['<div><i class="fa fa-facebook-square fa-5x"></i></div>'].join(''),
//            ['<div><i class="fa fa-linkedin-square fa-5x"></i></div>'].join(''),
//            ['<div><i class="fa fa-github-square fa-5x"></i></div>'].join(''),
            ['<div><img src="http://ebmedia.eventbrite.com/s3-build/images/3618759/81800181927/1/logo.png"></div>'].join(''),
//            ['<div><img src="http://bitcoinbaba.com/wp-content/uploads/2014/03/bitcoin.jpg"></div>'].join(''),
            ['<div><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Aceofspades.svg/180px-Aceofspades.svg.png"></div>'].join('')
        ]
    };
});