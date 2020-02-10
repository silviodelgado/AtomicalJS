$(function () {
    $('button.color').on('click', function (evt) {
        evt.preventDefault();

        //console.log('this', this);
        //console.log('$(this)', $(this));

        $('div').toggleClass('red');

        $('button.extend').trigger('click');
        $('button.extend').focus();
    });
    $('button.attribute').on('click', function (evt) {
        evt.preventDefault();

        $(this).attr('tabindex', '-1');
        $(this).attr('disabled', 'disabled');

        $().get('http://atomicaljs.test/playground/items.json', function (r) {
            console.log('response from ajax: ', r.data);
        });

        $().get('http://api.postmon.com.br/v1/cep/25965360', function (r) {
            console.log('CEP: ', r);
        })

        $(this).css('width', '500px');

        $('<div>Test div</div>').appendTo($('#div1'));

        $('#div1').append('<a href="https://www.interart.com">Test Link</a>');

        $('#div1 a').attr('target', '_blank');
    });
    $('button.extend').on('click', function (evt) {
        evt.preventDefault();

        var a = {
            b: 'c',
            d: {
                e: 'f',
                g: 'h'
            }
        }

        var b = {
            a: 'b',
            d: {
                g: 'i',
                j: 'k'
            }
        }
        
        console.log('$', $);
        var c = $().extend(a, b);
        console.log('a', a);
        console.log('b', b);
        console.log('c', c);
    });

    var a = $(document).ready(function () {
        console.log('ready 2 a');
        $('button.extend').focus();
    });
    //console.log('a', a);

    var b = $(document).ajaxStart(function () {
        console.log('ajax start 1');
    });
    //console.log('b', b);

    $(document).ready(function () {
        console.log('ready');
        //alert('Ready!');
    }).ajaxStart(function () {
        console.log('ajax start');
    }).ajaxComplete(function () {
        console.log('ajax complete');
    });
});