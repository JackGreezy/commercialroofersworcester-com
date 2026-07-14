//Constants
var TABLET_BREAKPOINT = 768;
var DESKTOP_BREAKPOINT = 1000;
var FULL_DESKTOP_BREAKPOINT = 1200;

// Function to find the element with greatest height
// and to set all of that class type to the same height
var sb_normalizeHeight = function( eClass ) {
    var maxHeight = -1;
    jQuery( eClass ).each(function() {
        maxHeight = maxHeight > jQuery( this ).height() ? maxHeight : jQuery( this ).height();
    });

    jQuery( eClass ).each(function() {
        jQuery( this ).height( maxHeight );
    });
}

//Undoes sb_normalizeHeight (mainly to be used for mobile)
var sb_resetHeight = function( eClass ) {
    jQuery( eClass ).each(function() {
        jQuery( this ).css( 'height', 'auto' );
    });
}

// Adds a timeout to re-calculate heights (to be used in an underscore debounce)
var sb_heightTimeout = function( eClass ) {
    setTimeout(function() {
        sb_resetHeight( eClass );
    }, 50 );
    setTimeout(function() {
        sb_normalizeHeight( eClass );
    }, 100 );
}

//When all jQuery selectors are found, execute a call-back.
//  Call-back is given first selector's result as context (this)
//  and all selectors' as arguments.
//
//  when('.class-a', '.class-b', function(a, b) {
//    console.log('Total found:', a.length + b.length)
//  })
var sb_when = function() {
    var selectors = Array.prototype.slice.apply( arguments ),
        cb = selectors.pop(),
        jq = [];

    for ( var i = 0; i < selectors.length; i++ ) {
        var $sel =  jQuery( selectors[i] );
        if ( ! $sel.length ) return;
        jq.push( $sel );
    };

    return cb.apply( jq[0], jq );
}

//Handles link scrolling smoothly
//Ex: sb_smoothScroll( '#hero .btn, #panel-one .btn' );
var sb_smoothScroll = function( elements ) {
    jQuery( elements ).click(function() {
        if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');

            if ( target.length ) {
                jQuery( 'html, body' ).animate({
                    scrollTop: target.offset().top
                }, 1000 );
                return false;
            }
        }
    });
}

// Helper for click to show items. The hidden class toggled on the element (element must start with class hidden).
// Ex: sb_initShowHideClickHandlers( '.icon-desktop-search', '#searchform-main' );
var sb_initShowHideClickHandlers = function( buttons, elements ) {
    var buttons  = jQuery( buttons ),
        elements = jQuery( elements ),
        hidden   = true;

    buttons.on( 'click', function(){
        if ( hidden ) {
            elements.removeClass( 'hidden' );
            hidden = false;
        } else {
            elements.addClass( 'hidden' );
            hidden = true;
        }
    });

    jQuery( document ).on( 'touchstart click', function( e ) {
        if (
            ! elements.is( e.target ) &&
            elements.has( e.target ).length === 0 &&
            ! buttons.is( e.target ) &&
            buttons.has( e.target ).length === 0 &&
            ! hidden
        ) {
            elements.addClass( 'hidden' );
            hidden = true;
        }
    });
}

//Main dropdown script
//Replace "#site-header" with id of main nav/header element
var sb_menuDropdown = function( elements ) {
    jQuery( elements ).hover(
        function() {
            jQuery( this ).find( 'ul' ).stop().slideDown( 300 );
        },
        function() {
            jQuery( this ).find( 'ul' ).stop().slideUp( 200 );
        }
    )
}

//True/False if it's small desktop
var sb_isTablet = function() {
    var documentWidth = jQuery( 'html' ).width();
    if ( documentWidth >= TABLET_BREAKPOINT ) {
        return true;
    } else {
        return false;
    }
};

//True/False if it's small desktop
var sb_isDesktop = function() {
    var documentWidth = jQuery( 'html' ).width();
    if ( documentWidth >= DESKTOP_BREAKPOINT ) {
        return true;
    } else {
        return false;
    }
};

//True/False if it's full desktop
var sb_isFullDesktop = function() {
    var documentWidth = jQuery( 'html' ).width();
    if ( documentWidth >= FULL_DESKTOP_BREAKPOINT ) {
        return true;
    } else {
        return false;
    }
};

// Check if object is visible on screen - only checks vertically
// Object.isInviewPort() -> bool
Object.defineProperty( Object.prototype, 'isInViewport', {
  value : function() {
      if(!this.length) return;
      var topOfElement    = jQuery( this ).offset().top,
          bottomOfElement = jQuery( this ).innerHeight() + topOfElement,
          topOfWindow     = jQuery( window ).scrollTop(),
          bottomOfWindow  = jQuery( window ).height() + topOfWindow;

      return topOfElement < bottomOfWindow && bottomOfElement > topOfWindow;
  },
  enumerable : false
});

// Call handler functions when object becomes visible on screen - only checks vertically
// Accepts two handler functions, ScrollOutOfViewHandler is optional
//
// Object.onScrollIntoView( scrollIntovViewHandler, scrollOutOfViewHandler );
//
//  $( '#site-footer' ).onScrollIntoView(
//      function() {
//          console.log( 'now you see me...' );
//      },
//      function() {
//          console.log( 'now you don\'t!' );
//      }
//  );
Object.defineProperty( Object.prototype, 'onScrollIntoView', {
    value : function() {
        var args                   = Array.prototype.slice.apply(arguments),
            scrollIntovViewHandler = args[0],
            scrollOutOfViewHandler = args[1],
            element                = jQuery( this ),
            elementIsInView        = element.isInViewport();

        jQuery( window ).on( 'scroll', function() {
            if ( element.isInViewport() != elementIsInView ) {
                elementIsInView = ! elementIsInView;
                callScrollHandler()
            }
        });

        var callScrollHandler = function() {
            if ( elementIsInView ) {
                scrollIntovViewHandler.call();
            } else {
                scrollOutOfViewHandler.call();
            }
        }

        callScrollHandler();
    },
    enumerable : false
});
