jQuery(document).ready(function ($) {

    /* ---------------------------------------------------------------------- */
    /*	------------------------------- Loading ----------------------------- */
    /* ---------------------------------------------------------------------- */

    /*Page Preloading*/
    $(window).load(function () {
        $('#spinner').fadeOut(200);
        $('#preloader').delay(200).fadeOut('slow');
        $('.wrapper').fadeIn(200);
        $('#custumize-style').fadeIn(200);
    });

    /* ---------------------------------------------------------------------- */
    /* ------------------------------- Taps profile ------------------------- */
    /* ---------------------------------------------------------------------- */

    $('.collapse_tabs').click(function () {

        if ($(this).hasClass('collapsed')) {
            $(this).find('i.glyphicon').removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        } else {
            $(this).find('i.glyphicon').removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        }

    });

    /* ---------------------------------------------------------------------- */
    /* -------------------------- easyResponsiveTabs ------------------------ */
    /* ---------------------------------------------------------------------- */

    $('#verticalTab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true
    });

    $("h2.resp-accordion").click(function () {
        $(this).find(".icon_menu").addClass("icon_menu_active");
        $("h2.resp-accordion").not(this).find(".icon_menu").removeClass("icon_menu_active");

        /*	Scroll To */
        $('html, body').animate({scrollTop: $('h2.resp-accordion').offset().top - 50}, 600);
    });

    $(".resp-tabs-list li").click(function () {
        $(this).find(".icon_menu").addClass("icon_menu_active");
        $(".resp-tabs-list li").not(this).find(".icon_menu").removeClass("icon_menu_active");
    });


    $(".resp-tabs-list li").hover(function () {
        $(this).find(".icon_menu").addClass("icon_menu_hover");
    }, function () {
        $(this).find(".icon_menu").removeClass("icon_menu_hover");
    });

    $("h2.resp-accordion").hover(function () {
        $(this).find(".icon_menu").addClass("icon_menu_hover");
    }, function () {
        $(this).find(".icon_menu").removeClass("icon_menu_hover");
    });

    /* ---------------------------------------------------------------------- */
    /* --------------------------- Scroll tabs ------------------------------ */
    /* ---------------------------------------------------------------------- */

    $(".content_2").mCustomScrollbar({
        theme: "dark-2",
        contentTouchScroll: true,
        advanced: {
            updateOnContentResize: true,
            updateOnBrowserResize: true,
            autoScrollOnFocus: false
        }
    });

    /* ---------------------------------------------------------------------- */
    /* ------------------------- Effect tabs -------------------------------- */
    /* ---------------------------------------------------------------------- */

    var animation_style = 'bounceIn';

    $('.dropdown-select').change(function () {
        animation_style = $('.dropdown-select').val();
    });


    $('ul.resp-tabs-list li[class^=tabs-]').click(function () {

        var tab_name = $(this).attr('data-tab-name');

        $('.resp-tabs-container').addClass('animated ' + animation_style);
        $('.resp-tabs-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.resp-tabs-container').removeClass('animated ' + animation_style);
        });

        $(".content_2").mCustomScrollbar("destroy");
        $(".content_2").mCustomScrollbar({
            theme: "dark-2",
            contentTouchScroll: true,
            advanced: {
                updateOnContentResize: true,
                updateOnBrowserResize: true,
                autoScrollOnFocus: false
            }
        });

        return false;
    });


    /* ---------------------------------------------------------------------- */
    /* ---------------------- redimensionnement ----------------------------- */

    /* ---------------------------------------------------------------------- */

    function redimensionnement() {

        if (window.matchMedia("(max-width: 800px)").matches) {
            $(".content_2").mCustomScrollbar("destroy");
            $(".resp-vtabs .resp-tabs-container").css("height", "100%");
            $(".content_2").css("height", "100%");
        } else {

            $(".resp-vtabs .resp-tabs-container").css("height", "580px");
            $(".content_2").css("height", "580px");
            $(".content_2").mCustomScrollbar("destroy");
            $(".content_2").mCustomScrollbar({
                theme: "dark-2",
                contentTouchScroll: true,
                advanced: {
                    updateOnContentResize: true,
                    updateOnBrowserResize: true,
                    autoScrollOnFocus: false
                }
            });

        }

    }

    // On lie l'événement resize à la fonction
    window.addEventListener('load', redimensionnement, false);
    window.addEventListener('resize', redimensionnement, false);

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Contact Form ------------------------------ */
    /* ---------------------------------------------------------------------- */

    // Needed variables
    var $contactform = $('#contactform'),
        $success = ' Your message has been sent. Thank you!';

    $contactform.submit(function () {
        $.ajax({
            type: "POST",
            url: "//formspree.io/daniel.marczydlo@gmail.com",
            data: $(this).serialize(),
            dataType: "json",
            success: function (msg) {

                if (!msg.error) {

                    response = '<div class="alert alert-success success-send">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                        '<i class="glyphicon glyphicon-ok" style="margin-right: 5px;"></i> ' + $success
                        + '</div>';

                    $(".reset").trigger('click');
                    $("#contact-name").removeClass("has-success");
                    $("#contact-email").removeClass("has-success");
                    $("#contact-message").removeClass("has-success");

                }
                // Hide any previous response text
                $(".error-send,.success-send").remove();
                // Show response message
                $contactform.prepend(response);
            },
            error: function (msg) {

                response = '<div class="alert alert-danger error-send">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    '<i class="glyphicon glyphicon-remove" style="margin-right: 5px;"></i> ' + msg.responseJSON.error
                    + '</div>';
                // Hide any previous response text
                $(".error-send,.success-send").remove();
                // Show response message
                $contactform.prepend(response);
            }
        });
        return false;
    });

    /* ---------------------------------------------------------------------- */
    /* ----------------------------- Portfolio ------------------------------ */
    /* ---------------------------------------------------------------------- */


    var filterList = {
        init: function () {

            // MixItUp plugin
            // http://mixitup.io
            $('#portfoliolist').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.filter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });

        },
        hoverEffect: function () {

            // Simple parallax effect
            $('#portfoliolist .portfolio').hover(
                function () {
                    $(this).find('.label').stop().animate({bottom: 0}, 200);
                    $(this).find('img').stop().animate({top: -30}, 500);
                },
                function () {
                    $(this).find('.label').stop().animate({bottom: -40}, 200);
                    $(this).find('img').stop().animate({top: 0}, 300);
                }
            );

        }

    };

    // Run the show!
    filterList.init();

    /* ---------------------------------------------------------------------- */
    /* ----------------------------- prettyPhoto ---------------------------- */
    /* ---------------------------------------------------------------------- */

    $("a[rel^='portfolio']").prettyPhoto({
        animation_speed: 'fast', /* fast/slow/normal */
        social_tools: '',
        theme: 'pp_default',
        horizontal_padding: 5,
        deeplinking: false,
    });


    /* ---------------------------------------------------------------------- */
    /* ---------------------------- icon menu ------------------------------- */
    /* ---------------------------------------------------------------------- */

    $(".resp-tabs-container h2.resp-accordion").each(function () {

        if ($(this).hasClass('resp-tab-active')) {
            $(this).append("<i class='glyphicon glyphicon-chevron-up arrow-tabs'></i>");
        } else {
            $(this).append("<i class='glyphicon glyphicon-chevron-down arrow-tabs'></i>");
        }
    });

    $(".resp-tabs-container h2.resp-accordion").click(function () {
        if ($(this).hasClass('resp-tab-active')) {
            $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        }

        $(".resp-tabs-container h2.resp-accordion").each(function () {

            if (!$(this).hasClass('resp-tab-active')) {
                $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
            }
        });


    });


    /* ---------------------------------------------------------------------- */
    /* -------------------------------- skillbar ---------------------------- */
    /* ---------------------------------------------------------------------- */

    $('.tabs-resume').click(function () {

        $('.skillbar').each(function () {
            $(this).find('.skillbar-bar').width(0);
        });

        $('.skillbar').each(function () {
            $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
            }, 2000);
        });

    });

    $('#resume').prev('h2.resp-accordion').click(function () {

        $('.skillbar').each(function () {
            $(this).find('.skillbar-bar').width(0);
        });

        $('.skillbar').each(function () {
            $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
            }, 2000);
        });
    });

});
