$(function () {
    $('button.color').on('click', function (evt) {
        evt.preventDefault();

        //console.log('this', this);
        //console.log('$(this)', $(this));

        $('div').toggleClass('red');
    });
    $('button.attribute').on('click', function (evt) {
        evt.preventDefault();

        $(this).attr('tabindex', '-1');
        $(this).attr('disabled', 'disabled');

        $().get('http://atomicaljs.test/items.json', function (r) {
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
});