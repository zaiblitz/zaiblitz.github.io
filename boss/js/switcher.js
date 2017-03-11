/*-----------------------------------------------------------------------------------
 /* Styles Switcher
 -----------------------------------------------------------------------------------*/

window.console = window.console || (function(){
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
        return c;
    })();


jQuery(document).ready(function($) {

    // Color Changer

    $(".blue" ).click(function(){
        $("#colors" ).attr("href", "css/colors/blue.css" );
        return false;
    });

    $(".orange" ).click(function(){
        $("#colors" ).attr("href", "css/colors/orange.css" );
        return false;
    });

    $(".yellow" ).click(function(){
        $("#colors" ).attr("href", "css/colors/yellow.css" );
        return false;
    });

    $(".pink" ).click(function(){
        $("#colors" ).attr("href", "css/colors/pink.css" );
        return false;
    });

    $(".cyan" ).click(function(){
        $("#colors" ).attr("href", "css/colors/cyan.css" );
        return false;
    });

    $(".olive" ).click(function(){
        $("#colors" ).attr("href", "css/colors/olive.css" );
        return false;
    });



    $("#layout-switcher").on('change', function() {
        $('#layout').attr('href', $(this).val() + '.css');
    });;


    // Style Switcher
    $('#style-switcher').animate({
        left: '-195px'
    });

    $('#style-switcher h2 a').click(function(e){
        e.preventDefault();
        var div = $('#style-switcher');
        console.log(div.css('left'));
        if (div.css('left') === '-195px') {
            $('#style-switcher').animate({
                left: '0px'
            });
        } else {
            $('#style-switcher').animate({
                left: '-195px'
            });
        }
    })

    $('.colors li a').click(function(e){
        e.preventDefault();
        $(this).parent().parent().find('a').removeClass('active');
        $(this).addClass('active');
    })




});
