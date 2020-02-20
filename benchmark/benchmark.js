var timer = function (operation) {
    console.time(operation);

    return {
        stop: function () {
            console.timeEnd(operation);
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