//console.log('$', $);

(function () {
    //console.log('$ 2', $);
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

        $('<div></div>').text('Test div').appendTo('#div1');
        $('<div></div>').html('&aacute;').appendTo('#div1');

        $('<div>Test div 2</div>').appendTo('#div1');

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

        $('div').hide();
    });
    $('button.last-button').on('click', function () {
        $('div').show();
    });

    var init_controls = function () {
        console.log('\n\n\nInit controls...\n\n');
        $('button.off').off();
        $('button.off').on('click', function (evt) {
            console.log('evt', evt);
            evt.preventDefault();
            console.log('random', Math.random());

            var first = $('#buttons button').first();
            console.log('first', first);
            var last = $('#buttons button').last();
            console.log('last', last);
            $(last).remove();

            init_controls();
        });
        
        $('.invalid-button').attr('fake', 'test');
        $('.invalid-button').removeAttr('fake');
        $('button.color').attr('id', 'color1');
        $('button.color').removeAttr('disabled');

        var has = $('button.off').hasClass('off');
        console.log('hasclass', has);
        var has2 = $('button.off1').hasClass('off');
        console.log('hasclass', has2);

        console.log('foo', $('button.off').data('foo'));

        $('button.off').removeClass('off2').addClass('off3');
        $('button.off1').removeClass('off2');

        $('button.off').toggleClass('off4').css('text-transform', 'uppercase');
        
    };

    var a = $(document).ready(function () {
        //console.log('ready 2 a');
        $('button.extend').focus();
        //init_controls();
    });
    //console.log('a', a);

    var b = $(document).ajaxStart(function () {
        console.log('ajax start 1');
    });
    //console.log('b', b);

    $(document).ready(() => {
        $('.fadein').on('click', (evt) => {
            evt.preventDefault();
            $('.color').fadeIn();
        });
        $('.fadein2').on('click', (evt) => {
            evt.preventDefault();
            $('.color').fadeIn('fast');
        });
        $('.fadeout').on('click', (evt) => {
            evt.preventDefault();
            $('.color').fadeOut();
        });
    });

    $(document).ready(function () {
        console.log('ready');
        //console.log('$ 3', $.ready());
        init_controls();
        //alert('Ready!');
    }).ajaxStart(function () {
        console.log('ajax start');
    }).ajaxComplete(function () {
        console.log('ajax complete');
    });
})();