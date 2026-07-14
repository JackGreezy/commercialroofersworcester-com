/* Single Project JavaScript/jQuery */
jQuery(function( $ ) {
    "use strict"

    //Page Nav Slider
    var navSlider = $( '#nav-slider' ),
        navLinks = $( '#nav-slider' ).children(),
        contentSlider = $( '#page-section-slider' ),
        projectSlider = $( '#project-section-slider' );

    navSlider.slick({
        slidesToShow: 1,
        speed: 1000,
        asNavFor: '.project-slider',
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
                    centerMode: false,
                    slidesToShow: 4,
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
    projectSlider.slick({
        fade: true,
        arrows: false,
        slidesToShow: 1,
        speed: 1000,
        asNavFor: '#nav-slider',
        adaptiveHeight: true,
        draggable: false,
        accessibility: false
    });

    // Tell the featured project label the right name
    $( '#nav-slider a' ).click(function() {
        var navText = $( this ).find( 'span' ).html();

        $( '.featured-sub-category-link' ).html( 'Featured ' + navText + ' Projects' );
        $( '#project-filter a.featured-sub-category-link' ).click();
    });
    navSlider.on( 'afterChange', function( event, slick, currentSlide ){
        var navText = $( '.slick-current' ).find( 'span' ).html();

        $( '.featured-sub-category-link' ).html( 'Featured ' + navText + ' Projects' );
    });

    // Move arrow to correct position
    setTimeout(function() {
        $( '.slick-current a' ).click();
    }, 300 );
    $( window ).resize(function(){
        setTimeout(function(){
            $( '.slick-current a' ).click();
        }, 300 );
    });

    // Handle toggling of featured/all projects
    $( '#project-filter a' ).click(function() {
        if ( ! $( this ).hasClass( 'active' ) ) {
            $( '#project-filter a' ).removeClass( 'active' );
            $( this ).addClass( 'active' );

            if ( $( this ).hasClass( 'all-category-link') ) {
                $( '.panel-wrapper.featured' ).hide();
                $( '.panel-wrapper.full' ).fadeIn( 300 );
                createKeywordSelect();
            } else {
                $( '.panel-wrapper.full' ).hide();
                $( '.panel-wrapper.featured' ).fadeIn( 300 );
                projectSlider.slick( 'reinit' );
            }
        }
    });

    // Keyword select injection
    var createKeywordSelect = function() {
        var keywordFilter = $( '#keyword-filter-wrapper' ).html();

        $( '.keyword-filter-wrapper' ).append( keywordFilter );
        $( '#keyword-filter-wrapper' ).remove();
        // Filter select
        $( '.ui.dropdown' ).dropdown({
            onChange: function( text, value ) {
                filterKeywords( text, value );
            }
        });
    }

    // Keyword filtering
    var filterKeywords = function( text, value ) {
        var selectedKeyword = value,
            projectKeywords = '';

        if ( selectedKeyword == 'All Projects' ) {
            $( '.full .image-panel' ).each(function() {
                $( this ).fadeIn( 300 );
            });
        } else {
            $( '.full .image-panel' ).each(function() {
                $( this ).show();
            });
            $( '.full .image-panel, .full image-panel:hidden' ).each(function() {
                projectKeywords = $( this ).attr( 'data-keywords' );

                if ( projectKeywords.indexOf( selectedKeyword ) < 0 ) {
                    $( this ).hide();
                }
            });
        }
    }
});
