/* Main Site JavaScript/jQuery */
jQuery(function( $ ) {
    "use strict"

    sb_when( '.sb-ajax-nav', function() {

        var sb_set_ajax_select = function( url ) {
            $( '.sb-select-ajax-nav option' ).each(function() {
                if ( $( this ).val() == url ) {
                    $( '.sb-select-ajax-nav option[value="' + url + '"]').attr( 'selected', 'selected' );
                }
            });
        }

        var ajax_load_page = function( url ) {
            $( '#main-content' ).animate({ // The element here should be overall div that contains ajax'd content
                opacity: 0.3
            }, 100, function() {
                $( this ).load( url + ' #main-content > *', function() {
                    $( this ).animate({
                        opacity: 1
                    }, 100 );
                });
                $( 'title' ).load( url + ' title', '', function() {
                    document.title = $( this ).text();
                });
                $( '.sb-ajax-nav a' ).each(function(){
                    if ( $( this ).attr( 'href' ) == url ) {
                        $( '.sb-ajax-nav a').removeClass( 'active' );
                        $( this ).addClass( 'active' );
                    }
                });
            });
        }

        $( document ).on( 'click', '.sb-ajax-nav a', function( e ) {
            e.preventDefault();

            var url   = $( this ).attr( 'href' ),
                title = $( 'title' ).text();

            $( '#main-content' ).html( '<img src="/wp-content/themes/miron/images/loading.gif" />' );

            sb_set_ajax_select( url );

            ajax_load_page( url );

            // Create a new history item.
            history.pushState( { url:url, title:title }, title, url );

        });

        $( '.sb-select-ajax-nav' ).on( 'change', function( e ) {
            e.preventDefault();

            var url   = $( this ).val(),
                title = $( '.sb-select-ajax-nav option:selected' ).text();

            $( '#main-content' ).html( '<img src="/wp-content/themes/miron/images/loading.gif" />' );

            ajax_load_page( url );

            // Create a new history item.
            history.pushState( { url:url, title:title }, title, url );

        });

        window.onload = function() {
            var url   = location.href,
                title = $( 'title' ).text();

            history.replaceState( { url:url, title:title }, title, url );

            $( 'a[href="' + url + '"]' ).addClass( 'active' );

            sb_set_ajax_select( url );

        }

        window.addEventListener( 'popstate', function( e ) {
            var url   = location.href;
            document.title = e.state.title;

            $( '#main-content' ).html( '<img src="/wp-content/themes/miron/images/loading.gif" />' );

            ajax_load_page( e.state.url );

            sb_set_ajax_select( url );

        });

        sb_when( '#toggle-title', function() {
            var url   = $( '.sb-ajax-nav a:first-child' ).attr( 'href' ),
                title = $( 'title' ).text();

            ajax_load_page( url );

            // Create a new history item.
            history.pushState( {url:url, title:title}, title, url );
        });
    });

});
