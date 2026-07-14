/* Single Project JavaScript/jQuery */
jQuery(function( $ ) {
    "use strict"

    //Hero Slider Initialization
    $( '#project-gallery' ).slick({
        prevArrow: '<div class="icon-cursor-left"></div>',
        nextArrow: '<div class="icon-cursor-right"></div>',
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 7000,
        speed: 700,
        dots: true
    });

    $( '#related-projects-slider' ).slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<div class="icon-related-prev"></div>',
        nextArrow: '<div class="icon-related-next"></div>',
        mobileFirst: true,
        responsive: [
            {
                breakpoint: DESKTOP_BREAKPOINT,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: FULL_DESKTOP_BREAKPOINT,
                settings: {
                    slidesToShow: 6
                }
            }
        ]
    });

});
