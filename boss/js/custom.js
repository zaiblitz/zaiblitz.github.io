// ***********************************
// pageloader
// ***********************************
$(window).load(function(){
    if($(".preloader").length > 0){
        $('.preloader').fadeOut(1000); // set duration in brackets
    }
});


// ***********************************
// totop
// ***********************************

$(document).ready(function(){
    $().UItoTop({ easingType: 'easeOutQuart' });
});


// **************************************
// jQuery to collapse the navbar on scroll
// **************************************

$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});



// ****************************************************************
// jQuery for page scrolling feature - requires jQuery Easing plugin
// ****************************************************************

$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});



// ****************************************************************
// Simple Text Rotator
// ****************************************************************

$(document).ready(function(){
    $(".brand-heading .rotate").textrotator({
        animation: "fade",
        speed: 2000
    });
});



// ****************************************************************
// owl-caurosel
// ****************************************************************

$(document).ready(function() {

    $("#intro-slider, #slider, #testimonial-list").owlCarousel({

        navigation : false, // Show next and prev buttons
        slideSpeed : 400,
        paginationSpeed : 400,
        singleItem:true,
        autoPlay: true

    });

    $("#member, #blog-list").owlCarousel({

        items : 3, //3 items above 1000px browser width
        itemsDesktop : [1000,3], //3 items between 1000px and 901px
        itemsDesktopSmall : [900,2], // betweem 900px and 601px
        itemsTablet: [600,1], //1 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option

    });

});



// ****************************************************************
// fitvids
// ****************************************************************

$(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $(".video-wrapper").fitVids();
});



// ****************************************************************
// colorbox
// ****************************************************************

$(document).ready(function(){
    $(".group1").colorbox({rel:'group1', transition:"fade", width:"94%", height:"94%"});
});



// ****************************************************************
// wow - for animation together with animate.css
// ****************************************************************

$(document).ready(function(){
    wow = new WOW(
        {
            animateClass: 'animated',
            offset:       150
        }
    );
    wow.init();
});



// ****************************************************************
// counterUp
// ****************************************************************

$(document).ready(function( $ ) {
    if($("span.count").length > 0){
        $('span.count').counterUp({
            delay: 10, // the delay time in ms
            time: 1000 // the speed time in ms
        });
    }
});


// ****************************************************************
// Form Validation
// ****************************************************************

/*
 Jquery Validation using jqBootstrapValidation
 example is taken from jqBootstrapValidation docs
 */
$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + " it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Sorry for the inconvenience!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});





