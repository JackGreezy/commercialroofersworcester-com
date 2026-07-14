"use strict";
jQuery(function (e) {
  e("#mobile-menu-wrap .menu li .sub-menu li a").on("click", function () {
    e("#mobile-menu-btn").click();
  }),
    sb_initShowHideClickHandlers(
      "#main-navigation .search-btn",
      '.search-container input[type="text"]'
    ),
    e("#main-navigation .search-btn").click(function () {
      e('.search-container input[type="text"]').focus();
    });
  var n = _.template(e("#menu-resources-template").text());
  e(typeof SB_DATA !== "undefined" ? SB_DATA.menu_items : []).each(function (
    i,
    t
  ) {
    e(t.menu_class).children(".sub-menu").prepend(n(t));
  }),
    e("#site-header .menu > li.menu-item-has-children").hover(
      function () {
        e(this).find("ul").stop().slideDown(300),
          e("#dropdown-screen").stop().fadeIn(200);
      },
      function () {
        e(this).find("ul").stop().slideUp(300),
          e("#dropdown-screen").stop().fadeOut(200);
      }
    ),
    e("#site-header .menu > li.menu-item-has-children a").each(function () {
      e(this).append('<div class="icon-dropdown-arrow"></div>');
    }),
    e('a[target="_blank"]').each(function () {
      e(this).attr("rel", "noopener");
    }),
    e("h3.toggle-trigger").click(function () {
      e(this).toggleClass("active"), e(this).next().slideToggle(300);
    }),
    e("#reply-title").click(function () {
      e("#commentform").slideToggle(300);
    }),
    e(".comment-reply-link").click(function (n) {
      n.preventDefault(), e("#commentform").slideDown(300);
    }),
    e("footer.posted a:last").on("click", function () {
      e("#commentform").slideDown(300);
    });
  var i = !1;
  e("#mobile-menu-btn").click(function () {
    i
      ? (e("#mobile-menu-wrap, html, #mobile-menu-btn").removeClass("open"),
        (i = !1))
      : (e("#mobile-menu-wrap, html, #mobile-menu-btn").addClass("open"),
        (i = !0));
  }),
    e("#mobile-menu-wrap .close-v2-svg").click(function () {
      e("#mobile-menu-wrap, html, #mobile-menu-button").removeClass("open"),
        (i = !1);
    }),
    e("#mobile-menu-wrap li.menu-item-has-children").click(function (n) {
      n.stopPropagation(), e(this).find(".sub-menu").fadeToggle();
    });
  var t = 25,
    o = 84,
    l = function () {
      var n = e(window).height();
      e(document).height();
      e("#mobile-menu-wrap").height(n - o),
        e("#mobile-menu-interior-wrap").css("max-height", n - t - o);
    };
  l(), e(window).resize(l);
});

(function (window) {
  "use strict";

  var mainContainer = document.getElementById("outer-page-wrapper"),
    openCtrl = document.getElementById("btn-search"),
    closeCtrl = document.getElementById("btn-search-close"),
    searchContainer = document.getElementById("search-wrap"),
    body = document.getElementsByTagName("body");
  if (!searchContainer) {
    return;
  }
  var inputSearch = searchContainer.querySelector(".search__input");

  function init() {
    initEvents();
  }

  function initEvents() {
    openCtrl.addEventListener("click", openSearch);
    closeCtrl.addEventListener("click", closeSearch);
    document.addEventListener("keyup", function (ev) {
      // escape key.
      if (ev.keyCode == 27) {
        closeSearch();
      }
    });
  }

  function openSearch() {
    //mainContainer.classList.add('main-wrap--hide');
    var searchOpen = document.getElementsByClassName("search--open");
    if (searchOpen.length > 0) {
      closeSearch();
    } else {
      searchContainer.classList.add("search--open");
      body[0].classList.add("search-opened");
      setTimeout(function () {
        inputSearch.focus();
      }, 500);
    }
  }

  function closeSearch() {
    //mainContainer.classList.remove('main-wrap--hide');
    searchContainer.classList.remove("search--open");
    body[0].classList.remove("search-opened");
    inputSearch.blur();
    inputSearch.value = "";
  }

  init();
})(window);

//E Newsletter Scroll Trigger
jQuery(function ($) {
  // hide auto complete for search
  jQuery(".search__input").attr("autocomplete", "off");

  var $signup = $("#newsletter-signup"),
    $body = $("body"),
    $header = $("#site-header"),
    header_height = $header.outerHeight();

  $(window).scroll(function () {
    header_height = $header.outerHeight();
    var scroll = $(window).scrollTop();

    if (scroll >= header_height) {
      $body.addClass("sticky");
    } else {
      $body.removeClass("sticky");
    }
  });

  /*$('.wpmm-sub-menu-wrap').each(function(index, item) {
		var pos = ($(window).width() - 1400 * .90401714) / 2;
		$(item).css('background-position', pos+'px');
	})*/

  $("#site-footer").onScrollIntoView(
    function () {
      $signup.addClass("visible");
    },
    function () {
      $signup.removeClass("visible");
    }
  );

  var $loadmore = $("#loadmore");
  if ($loadmore) {
    loadPosts($loadmore);
    $body.on("click", "#loadmore", function () {
      loadPosts($(this));
    });
  }

  function loadPosts($this, replace_content=false) {
    var button = $this,
      data = {
        action: "loadmore",
        page: site_params.current_page,
        post_name: site_params.post_name,
      };
    if (site_params.cat_id) {
      data.cat_id = site_params.cat_id;
    }

    $('#gallery-loader').fadeIn().css('display', 'flex');
    var text = button.find(".js-text").text();
    $.ajax({
      // you can also use $.post here
      url: site_params.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function (xhr) {
        button.find(".js-text").text("Loading..."); // change the button text, you can also add a preloader image
      },
      success: function (data) {
        button.find(".js-text").text(text);
        if (data) {
          if(replace_content) {
            $("#project_content").empty().append(data);
          } else {
            $("#project_content").append(data); // insert new posts
          }

          if (site_params.current_page >= site_params.max_page)
            $("#loadmore").remove(); // if last page, remove the button

          site_params.current_page++;
          $("#content-wrapper").removeClass("loading");
          $("#loadmore").css("opacity", 1);
          // you can also fire the "post-load" event here if you use a plugin that requires it
          // $( document.body ).trigger( 'post-load' );
        } else {
          button.remove(); // if no data, remove the button as well
        }
        $('#gallery-loader').fadeOut();

      },
    });
  }

  $("body").on("click", ".js-project_category", function (e) {
    e.preventDefault();
    site_params.current_page = 1;
    var $this = $(this);
    var href = $this.attr("href");
    site_params.cat_id = $this.data('page_id');
    site_params.post_name = $this.data('slug');
    if ($this.parent().hasClass("active")) {
      return;
    }
    loadPosts($this, true);
    
  });

  // add click event for page toggler
  addClickEvent(".js-page-link", $("#content-wrapper"), function (data, $this) {
    if (data) {
      $("#primary-content").fadeOut(500, function () {
        $("#").html(data).fadeIn();
      });
    } else {
      console.log("No data returned");
    }
  });

  function addClickEvent(link_selector, $loading_wrapper, callback) {
    $("body").on("click", link_selector, function (e) {
      e.preventDefault();
      site_params.current_page = 1;
      var $this = $(this);
      var href = $this.attr("href");
      if ($this.parent().hasClass("active")) {
        return;
      }
      console.log($this);
      loadPostContent($this, $loading_wrapper, callback);
      $this.parent().parent().find(".active").removeClass("active");
      $this.parent().addClass("active");
    });
  }

  function loadPostContent($this, $loading_wrapper, callback) {
    var data = {
      action: "loadpostcontent",
      page_id: $this.data("page_id"),
    };
    $.ajax({
      // you can also use $.post here
      url: site_params.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function (xhr) {
        $loading_wrapper.addClass("loading");
      },
      success: function (data) {
        callback(data, $this);
      },
    });
  }

  function loadCategoryGallery($this) {
    var data = {
      action: "loadcategorycontent",
      page_id: $this.data("page_id"),
    };
    $.ajax({
      // you can also use $.post here
      url: site_params.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function (xhr) {
        $("#project-gallery-wrap").fadeOut();
      },
      success: function (data) {
        if (data) {
          $("#project-gallery").html(data); // insert new posts
          loadPosts($loadmore);
          $("#project-gallery-wrap").fadeIn();

          // you can also fire the "post-load" event here if you use a plugin that requires it
          // $( document.body ).trigger( 'post-load' );
        } else {
        }
      },
    });
  }

  // side nav accordion
  var $li = $(".side-nav .menu-item-has-children");
  if ($li.length) {
    $li.each(function () {
      var $this = $(this);
      if (
        $this.hasClass("current-menu-parent") ||
        $this.hasClass("current-menu-item")
      ) {
        $this.addClass("opened");
        $this.children(".sub-menu").slideDown();
      }
      $this.append(
        '<span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="30.727px" height="30.727px" viewBox="0 0 30.727 30.727"><path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0   l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"/></svg></span>'
      );
      $this.find(".arrow").on("click", function () {
        if ($this.hasClass("opened")) {
          $this.removeClass("opened");
          $this.find(".sub-menu").slideUp();
        } else {
          $this.addClass("opened");
          $this.find(".sub-menu").slideDown();
        }
      });
    });
  }
  // remove all empty p tags
  $("p:empty").remove();
});
