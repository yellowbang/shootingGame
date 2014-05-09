define(function(require, exports, module) {
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');

    module.exports = {
        timeAgo: function(time){
            var now = Date.now();
            var difference = now - time;
            var minute = 60000;
            var hour = 60 * minute;
            var day = 24 * hour;

            if (difference < minute) {
                return "Just Now"
            } else if (difference < hour) {
                var minutes = ~~(difference/minute);
                return minutes + "m ago";
            } else if (difference < day) {
                var hours = ~~(difference/hour);
                return hours + "h ago";
            } else {
                var days = ~~(difference/day);
                return days + "d ago";
            }
        },
        timeSince: function(time){
            var now = Date.now();
            var timeObj = new Date(time);
            var today = now - now%(3600000*24);
            if (time >= today) {
                return (timeObj.toTimeString()).split(' ')[0].substring(0,5);
            } else if ( today - 3600000 * 24 <= time && time < today){
                return 'yesterday';
            } else if ( today - 3600000 * 24 * 7 <= time && time< today - 3600000 * 24){
                return timeObj.toDateString().split(' ')[0];
            } else {
                return timeObj.toLocaleDateString();
            }
        },
        capitalize: function(string) {
            return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
        },
        // functions that generate constant results
        isDev: _.memoize(function(){
            return window.location.host.indexOf('localhost:3')==0;
        }),
        isMobile: _.memoize(function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        }),
        deviceSync: _.memoize(function(){
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))? TouchSync:MouseSync;
        }),
        linkify: function(text) {
            var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            return text.replace(urlRegex, function(url) {
                return '<a href="' + url + '">' + url + '</a>';
            })
        }
    };
});