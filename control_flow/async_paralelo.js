var async = require('async');

async.parallel([
    function(callback) {
        console.log('start 1');

        setTimeout(function() {
            console.log('1');

            callback(null, '1');
        }, 800);
    },
    function(callback) {
        console.log('start 2');

        setTimeout(function() {
            console.log('2');

            callback(null, '2');
        }, 500);
    },
    function(callback) {
        console.log('start 3');

        setTimeout(function() {
            console.log('3');

            callback(null, '3');
        }, 700);
    },
    function(callback) {
        console.log('start 4');

        setTimeout(function() {
            console.log('4');

            callback(null, '4');
        }, 100);
    },

],
// optional callback
function(err, results) {
    console.log(results);
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});
