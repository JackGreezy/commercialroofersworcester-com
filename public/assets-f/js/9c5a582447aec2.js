/* Home Page JavaScript/jQuery */
jQuery(function( $ ) {
    "use strict"

    //Opening Sequence Animation/Logic ---------------------------------------------------------------------------------

    //Only do cookie stuff if it's desktop
    if ( sb_isDesktop() ) {

        //Grab cookie value to test
        var cookieValue = Cookies.get( 'opening-sequence' );

        //If the cookie isn't set
        if ( cookieValue !== 'hidden' ) {

            $( 'html' ).addClass( 'open' );
            $( '#opening-sequence' ).addClass( 'visible' );

            //Glow animation
            setTimeout(function() {
                $( '.sequence-glow' ).addClass( 'loaded' );
            }, 500 );

            //Logo animation
            setTimeout(function() {
                $( '.phase-2' ).addClass( 'loaded' );
            }, 1500 );
            setTimeout(function() {
                $( '.phase-3' ).addClass( 'loaded' );
            }, 2000 );

            //Closing
            setTimeout(function() {
                $( '#opening-sequence-inner' ).addClass( 'hidden' );
            }, 4000 );
            setTimeout(function() {
                $( '#opening-sequence' ).removeClass( 'visible' );
                $( 'html' ).removeClass( 'open' );
            }, 5000 );

            //Cookie set to expire every 24 hours
            Cookies.set( 'opening-sequence', 'hidden', { expires: 1 });
        }

        //Delete Cookie Invisible Button
        $( '#delete-cookie' ).click(function() {
            Cookies.remove( 'opening-sequence' );
        });
    }

    //End Opening Sequence Animation/Logic -----------------------------------------------------------------------------
    $('#hero-slider').on('init', function () {
      //Starts playing the first hero video
      if ( sb_isDesktop() && document.getElementById( 'video3' ) ) {
          document.getElementById( 'video3' ).play();
      }
    });

    //Hero Slider Initialization
    $( '#hero-slider' ).slick({
        arrows: false,
        pauseOnHover: false,
        fade: true,
        speed: 1500,
        initialSlide: 2,
        waitForAnimate: false
    });

    //Right before slide change, if there's a video, play it
    $( '#hero-slider' ).on( 'beforeChange', function( event, slick, currentSlide, nextSlide ) {
        var nthChild = nextSlide + 1;

        //Only play video if it has a video to play
        if ( document.getElementById( 'video' + nthChild ) ) {
            //Make sure the video starts from the beginning
            document.getElementById( 'video' + nthChild ).load();
        }
    });

    //Handles hero pagination sliding
    var pagId = 3;
    $( '.pag-slide' ).click(function() {
        pagId = $( this ).attr( 'id' );

        if ( ! $( this ).hasClass( 'active' ) ) {
            $( '.pag-slide' ).each(function(){
                $( this ).removeClass( 'active' );
            });
            $( this ).addClass( 'active' );

            pagId = pagId.replace( 'slide', '' );
            pagId = pagId.replace( '-pag', '' );
            $( '#hero-slider' ).slick( 'slickGoTo', pagId - 1 );

            $( '#pag-slider' ).removeClass();
            $( '#pag-slider' ).addClass( 'position-' + pagId );
        }
    });

    //Handles clicking left/right of slide
    $( '#hero-left' ).click(function() {
        if ( pagId > 1 ) {
            pagId = pagId - 1;
        } else {
            pagId = 5;
        }
        $( '#slide' + pagId + '-pag' ).click();
    });
    $( '#hero-right' ).click(function() {
        if ( pagId < 5 ) {
            pagId = pagId*1 + 1;
        } else {
            pagId = 1;
        }
        $( '#slide' + pagId + '-pag' ).click();
    });

    //Hero more arrow
    sb_smoothScroll( '#hero-arrow' );

    //Our Expertise Scroll Trigger
    $( '#category-filter' ).onScrollIntoView(
        function() {
            $( '.icon-expertise-building2' ).addClass( 'visible' );
            setTimeout(function() {
                $( '#home-expertise' ).addClass( 'visible' );
            }, 1000 );
        },
        function() {

        }
    );

    //Expertise Select UI
    $( '.ui.dropdown' ).dropdown({
        onChange: function( text, value ) {
            manageExpertise( text, value );
        }
    });

    // Handles featured project toggle on the home page
    var manageExpertise = function( text, value ) {
        var panelSectionId = '#' + text + '-section';

        //Only set the link if it's not the first "Choose a Market" option
        if ( value != 'Choose a Market' ) {
            $( '.expertise-link' ).html( 'Visit our ' + value + ' Page' );
            $( '.expertise-link' ).attr( 'href', '/our-experience/' + text + '/' );
        } else {
            $( '.expertise-link' ).html( '' );
            $( '.expertise-link' ).attr( 'href', '#' );
        }

        $( '.panel-section' ).hide();
        $( panelSectionId ).fadeIn( 300 );

        /*setTimeout(function() {
            $( '#home-drive' ).parallax({
                imageSrc: '/wp-content/themes/nza409c/images/backgrounds/what-drives-us.jpg'
            });
            console.log('wooo');
        }, 1000 );*/

    }

    //What Drives Us expanding boxes
    $( '.drive-box' ).click(function() {
        if ( ! $( this ).hasClass( 'active' ) ) {
            $( '.drive-box' ).each(function() {
                $( this ).removeClass( 'active' );
            });
            $( this ).addClass( 'active' );
        }
    });

    //Red dot animation for what drives us
    $( '#home-drive .section-description' ).onScrollIntoView(
        function() {
            $( '.red.special' ).addClass( 'loaded' );
            setTimeout(function() {
                $( '.right .drive-box:first-child').click();
                $( '.red.special' ).addClass( 'hidden' );
            }, 1300 );
        },
        function() {

        }
    );

    //Blog Slider Initialization
    $( '#blog-slider' ).slick({
        dots: true,
        speed: 1000,
        slidesToShow: 1,
        prevArrow: '<div class="icon-blog-prev blog-arrow"></div>',
        nextArrow: '<div class="icon-blog-next blog-arrow"></div>'
    });

});
