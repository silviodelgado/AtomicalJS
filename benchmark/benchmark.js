
var timer = function (operation) {
    var start = performance.now();

    return {
        stop: function () {
            var end = performance.now();
            var time = end - start;
            console.log('Timer: ', operation, 'finished in', time, 'ms');
        }
    }
}
$('button').on('click', function () {
    var t = timer('appendTo');
    for (var i = 1; i <= 10000; i++) {
        $('<li></li>').text(i).appendTo('#lst');
    }
    t.stop();
})