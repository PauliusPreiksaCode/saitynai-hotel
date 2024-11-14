(function ($) {
    "use strict"; // Start of use strict
    /*
        - Input search focus action
        - Navbar toggler
        - Dark Theme
        - Fullscreen
        - Scrollbar
        - Sidebar collapse
        - Material ripple effect
        - Back to top
        - Page loader
    */
    /*-------------------------------------------
        Input search focus action
    --------------------------------------------- */
    if ($('.search').length) {
        $("body").on("focus", ".search__text", function () {
            $(this).closest(".search").addClass("search--focus");
        }), $("body").on("blur", ".search__text", function () {
            $(this).val(""), $(this).closest(".search").removeClass("search--focus");
        });
    }
    /*-------------------------------------------
        Navbar toggler
    --------------------------------------------- */
    if ($('.navbar-toggler').length) {
        //Navbar collapse hide
        $('.navbar-toggler').on('click', function () {
            $('.navbar-collapse').collapse('hide');
        });
    }

    /*-------------------------------------------
            Navbar
        --------------------------------------------- */
    //navbar add remove calss
    var header = $(".navbar-transfarent");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            header.removeClass('navbar-transfarent').addClass("navbar-bg");
        } else {
            header.removeClass("navbar-bg").addClass('navbar-transfarent');
        }
    });

    /*-------------------------------------------
           Dark Theme
       --------------------------------------------- */
    if ($('.dark-button, .light-button').length) {
        // Dark Mode Setup
        const darkMode = localStorage.getItem('dark-mode') || 'light';
        $('html').toggleClass('dark', darkMode === 'dark');
        $('.dark-button').toggle(darkMode !== 'dark');
        $('.light-button').toggle(darkMode === 'dark');

        // Toggle dark UI
        $('.dark-button, .light-button').on('click', function () {
            const isDark = $(this).hasClass('dark-button');
            $('.dark-button').toggle(!isDark);
            $('.light-button').toggle(isDark);
            $('html').toggleClass('dark', isDark);
            localStorage.setItem('dark-mode', isDark ? 'dark' : 'light');

        });
    }
    /*-------------------------------------------
        Fullscreen
    --------------------------------------------- */
    if ($('#btnFullscreen').length) {
        function toggleFullscreen(elem = document.documentElement) {
            const isFullscreen = document.fullscreenElement || document.mozFullScreenElement ||
                document.webkitFullscreenElement || document.msFullscreenElement;

            if (!isFullscreen) {
                const methods = ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'];
                const method = methods.find(method => elem[method]);

                if (method) elem[method](Element.ALLOW_KEYBOARD_INPUT);
            } else {
                const exitMethods = ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'];
                const exitMethod = exitMethods.find(method => document[`${method}`]);

                if (exitMethod) document[`${exitMethod}`]();
            }
        }

        document.getElementById('btnFullscreen')?.addEventListener('click', function () {
            toggleFullscreen();
            $(this).find('.fa-maximize').toggleClass('fa-minimize');
        });

    }
    /*-------------------------------------------
        Scrollbar
    --------------------------------------------- */
    if ($('.sidebar-body').length) {
        $('.sidebar-body').each(function () {
            const ps = new PerfectScrollbar($(this)[0]);
        });
    }
    if ($('.dropdown-menu-scroll').length) {
        $('.dropdown-menu-scroll').each(function () {
            const ps = new PerfectScrollbar($(this)[0]);
        });
    }
    if ($('.metismenu').length) {
        $('.metismenu').metisMenu();//Metismenu
    }


    /*-------------------------------------------
           Sidebar collapse
       --------------------------------------------- */
    if ($('#sidebarCollapse').length) {
        $('#sidebarCollapse').on('click', function () {
            $('.sidebar, .navbar').toggleClass('active');
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('.overlay').toggleClass('active');
            } else {
                $('.overlay').removeClass('active');
            }
        });

        $('.overlay').on('click', function () {
            $('.sidebar, .overlay, .sidebar-icon-aside, .sidebar-icon .nav-link').removeClass('active');
        });

        $('.sidebar .with-sub').on('click', function (e) {
            e.preventDefault();
            var $parent = $(this).parent();
            $parent.toggleClass('show').siblings().removeClass('show');
        });

        var minimizeSidebar = false,
            miniSidebar = 0;

        function checkPosition(x) {
            if (x.matches) { // If media query matches

                if (!minimizeSidebar) {
                    var minibutton = $('.sidebar-toggle-icon');
                    if ($('.sidebar-mini').hasClass('sidebar-collapse')) {
                        miniSidebar = 1;
                        minibutton.addClass('toggled');
                    }
                    minibutton.on('click', function () {
                        if (miniSidebar === 1) {
                            $('.sidebar-mini').removeClass('sidebar-collapse');
                            minibutton.removeClass('toggled');
                            miniSidebar = 0;
                        } else {
                            $('.sidebar-mini').addClass('sidebar-collapse');
                            minibutton.addClass('toggled');
                            miniSidebar = 1;
                        }
                        $(window).resize();
                    });
                    minimizeSidebar = true;
                }
                $('.sidebar').hover(function () {
                    if ($('.sidebar-mini').hasClass('sidebar-collapse')) {
                        $('.sidebar-mini').addClass('sidebar-collapse_hover');
                    }
                }, function () {
                    if ($('.sidebar-mini').hasClass('sidebar-collapse')) {
                        $('.sidebar-mini').removeClass('sidebar-collapse_hover');
                    }
                });
            }
        }

        var x = window.matchMedia("(min-width: 768px)");
        checkPosition(x); // Call listener function at run time
        x.addListener(checkPosition); // Attach listener function on state changes
    }

    /*-------------------------------------------
            Material ripple effect
        --------------------------------------------- */
    if ($('.material-ripple').length) {
        $(".material-ripple").on('click', function (event) {
            var surface = $(this);
            if (!surface.find(".material-ink").length) surface.prepend("<div class='material-ink'></div>");
            var ink = surface.find(".material-ink").removeClass("animate");
            if (!ink.height() && !ink.width()) {
                var diameter = Math.max(surface.outerWidth(), surface.outerHeight());
                ink.css({ height: diameter, width: diameter });
            }
            var xPos = event.pageX - surface.offset().left - (ink.width() / 2);
            var yPos = event.pageY - surface.offset().top - (ink.height() / 2);
            var rippleColor = surface.data("ripple-color");
            ink.css({ top: yPos + 'px', left: xPos + 'px', background: rippleColor }).addClass("animate");
        });
    }

    /*-------------------------------------------
        Back to top
    --------------------------------------------- */

    $('body').append('<div id="toTop" class="btn-top"><i class="fa-solid fa-arrow-up fs-16"></i></div>');
    $(window).scroll(function () {
        if ($(this).scrollTop() !== 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    /*-------------------------------------------
        Page loader
    --------------------------------------------- */

    $(window).on("load", function () {
        if ($('.page-loader-content').length) {
            setTimeout(function () {
                $(".page-loader-content").addClass("page-loader-active");
            }, 200);
            $(document).ready(function () {
                pageLoading();
            });

            function pageLoading() {
                var progressBar = $(".page-loader-bar");
                var percentText = $(".page-loader-percent");

                var interval = setInterval(function () {
                    var currentWidth = progressBar.width();
                    var maxWidth = $(".page-loader-progress").width();
                    var currentPercent = Math.round((currentWidth / maxWidth) * 100);

                    if (currentPercent < 101) {
                        progressBar.width(currentWidth + 1);
                        percentText.text(currentPercent + "%");
                    } else {
                        clearInterval(interval);

                        setTimeout(function () {
                            $(".page-loader-content").removeClass("page-loader-active");
                        }, 400);
                        setTimeout(function () {
                            $(".page-loader").removeClass("page-loader-active");
                        }, 800);
                    }
                }, 5);
            }
        }

    });

})(jQuery);

