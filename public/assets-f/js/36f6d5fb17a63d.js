/* Default Page JavaScript/jQuery */
jQuery(function ($) {
    "use strict"

    //Handle interior content width (sidebar is static width)
    var setContentWidth = function () {
        var contentWidth = $('.main-content').width();

        if (sb_isTablet()) {
            $('.left-content').width(contentWidth - 400);
        } else {
            $('.left-content').width('100%');
        }

    }
    setContentWidth();
    $(window).resize(setContentWidth);

    //Social Widget Toggle
    $('.sm-tab').click(function () {
        var tabId = $(this).attr('id'),
            contentId = '';
        if (!$(this).hasClass('active')) {
            $('.sm-tab').removeClass('active');
            $(this).addClass('active');

            contentId = '#' + tabId.replace('-tab', '-content');
            $('.social-feed').removeClass('active');
            $(contentId).addClass('active');
        }
    });

    //Page Nav Slider
    var navSlider = $('#nav-slider'),
        navLinks = $('#nav-slider').children(),
        contentSlider = $('#page-section-slider');

    sb_when('.page-template-default', function () {

        navSlider.slick({
            slidesToShow: 1,
            speed: 1000,
            asNavFor: '#page-section-slider',
            focusOnSelect: true,
            mobileFirst: true,
            centerMode: true,
            arrows: true,
            accessibility: false,
            prevArrow: '<div class="icon-prev" tabindex="0"></div>',
            nextArrow: '<div class="icon-next" tabindex="0"></div>',
            responsive: [
                {
                    breakpoint: FULL_DESKTOP_BREAKPOINT,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        contentSlider.slick({
            fade: true,
            arrows: false,
            slidesToShow: 1,
            speed: 1000,
            asNavFor: '#nav-slider',
            adaptiveHeight: true,
            draggable: false,
            accessibility: false
        });
    });

    //Making sure nav is updated on click of page toggle
    navSlider.on('afterChange', function (event, slick, currentSlide) {
        var link = navLinks.eq(currentSlide),
            sectionId = link.data('id');

        //window.location.hash = sectionId.replace( '-nav', '' );
    });
    $(document).on('click', '.page-nav a', function () {
        var slickIndex = $(this).data('slick-index'),
            sectionId = $(this).data('id');

        contentSlider.slick('slickGoTo', slickIndex);

        window.location.hash = sectionId.replace('-nav', '');
    });

    //Selects proper page toggle from url
    var setToggleFromHash = function () {
        var toggleUrl = window.location.href,
            toggleUrlArray = toggleUrl.split('#'),
            toggleId = toggleUrlArray[1] + '-nav' ? toggleUrlArray[1] + '-nav' : '';

        if (toggleId) {
            var foundLink = false;
            $('[data-id="' + toggleId + '"]').each(function () {
                if (foundLink) { return; }

                if ($(this).data('slick-index') < 0) {
                    return;
                } else {
                    foundLink = true;
                    $(this).click();
                }
            });
        }
    }
    $(document).ready(setToggleFromHash);

    //Make sure toggle updates when selecting from the site navigation
    $('#main-navigation a').click(function () {
        setTimeout(function () {
            setToggleFromHash();
        }, 500);
    });

    //Hero Slider Initialization
    if (jQuery('body').hasClass('single-project')) {
        $('.hero-slider').slick({
            prevArrow: '<div class="icon-cursor-left"></div>',
            nextArrow: '<div class="icon-cursor-right"></div>',
            pauseOnHover: true,
            autoplay: true,
            autoplaySpeed: 7000,
            speed: 700,
            dots: true,
            slidesToShow: 1,
            centerMode: false,
            //centerPadding: "25%",
            infinite: true,
            //fade: true, 
        });
    } else {
        $('.hero-slider').slick({
            prevArrow: '<div class="icon-cursor-left"></div>',
            nextArrow: '<div class="icon-cursor-right"></div>',
            pauseOnHover: true,
            autoplay: true,
            autoplaySpeed: 7000,
            speed: 700,
            dots: true
        });
    }

    // Header dropdown 
    $(".header-select-dropdown select.child-pages").change(function () {
        var link = $(".header-select-dropdown select.child-pages option:selected").attr('data-link');
        window.location = link;
    });

    $('.project-category-nav-main > ul').navToSelect({
        useOptgroup: true,
    });

    $('.post-type-archive ul.newsroom-menu ul.sub-menu').navToSelect({
        useOptgroup: true,
        indentString: '',
        indentSpace: false,
        //placeholder: jQuery('.post-type-archive ul.newsroom-menu .sub-menu li.current-menu-item a').text(),
        placeholder: 'CATEGORIES',
    });

});