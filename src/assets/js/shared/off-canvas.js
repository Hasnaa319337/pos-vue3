;(function ($) {
  'use strict'

  $(function () {
    $('body').on('click', '[aria-controls="ui-basic"]', function () {
      $(this).parent('.nav-item').find('.collapse').toggleClass('show')
      $(this).attr('href', '#')
    })

    $('body').on('click', '[data-toggle="dropdown"]', function (e) {
      e.stopPropagation()
      $(this).parent('.nav-item').find('.dropdown-menu').toggleClass('show')
    })

    $('body').on('click', '.container-scroller', function () {
      $('.navbar-nav .dropdown-menu').removeClass('show')
    })

    $('body').on('click', '[data-toggle="offcanvas"]', function () {
      $('.sidebar-offcanvas').toggleClass('active')
      $('.main-panel').toggleClass('active')
    })

    $('body').on('click', '[aria-controls=""]', function () {
      // $('.sidebar-offcanvas').removeClass('active');
      // $('.main-panel').removeClass('active');
    })
    let windowWidth = $(window).width()

    if (windowWidth < 768) {
      $('.sidebar-offcanvas').removeClass('active')
      $('.main-panel').removeClass('active')
      $('body').on('click', '.main-panel', function () {
        $('.sidebar-offcanvas').removeClass('active')
        $('.main-panel').removeClass('active')
      })
      $('body').on('click', '[aria-controls=""]', function (e) {
        e.preventDefault()
        $('.sidebar-offcanvas').removeClass('active')
        $('.main-panel').removeClass('active')
      })
    }
    $('body').on('click', '[aria-controls=""]', function (e) {
      e.preventDefault()
      // $('.sidebar-offcanvas').removeClass('active')
      //   $('.main-panel').removeClass('active')
    })
  })
})(jQuery)
