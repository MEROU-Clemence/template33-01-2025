$(document).ready(function () {
    // ****** Nav
    // Mobile Nav
    var MobNav = $('.navbar-toggler');
    var $menu = $('.mobile-nav');

    MobNav.on('click', function () {
        if ($menu.hasClass('menu-mobile-active')) {
            $menu.addClass('during-close-menu');

            setTimeout(function () {
                $menu.removeClass('menu-mobile-active during-close-menu');
            }, 800);
        } else {
            $menu.addClass('menu-mobile-active');
            $menu.removeClass('during-close-menu');
        }
        
        $('.contacts-top-menu').toggleClass('d-none');
        $('.btn-menu.btn-menu-bars').toggleClass('become-a-cross');
        $('.content-section-first-nav .logo.logo-w').toggleClass('d-none');
        $('.content-section-first-nav').toggleClass('menu-header-open');
        $('main').toggleClass('main-top');
    });

    // Sous-menu mobile
    $('.clic-sub-menu').on('click', function () {
        if ($(this).children('.sub-menu').hasClass('sub-menu-active')) {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
        } else {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
            $(this).children('.sub-menu').addClass('sub-menu-active');
        }
    });

    // Sous-menu computer
    $('.clic-sub-menu-2').on('click', function () {
        $('.clic-sub-menu.clic-sub-menu-2 .sub-menu').removeClass('sub-menu-active');
    });

    // ****** Pour le texte qui tourne autour de l'avatar
    const textSpans = document.querySelectorAll(".text span");
    const rectWidth = 286; // Largeur du rectangle
    const rectHeight = 279; // Hauteur du rectangle
    const duration = 25000; // Temps d'un tour entier

    // Diviser chaque mot en lettres
    textSpans.forEach((span) => {
        const word = span.textContent.trim();
        span.innerHTML = ""; // Réinitialiser le contenu
        word.split("").forEach((letter) => {
            const letterSpan = document.createElement("span");
            letterSpan.textContent = letter;
            letterSpan.classList.add("letter");
            span.appendChild(letterSpan);
        });
    });

    // Sélectionner toutes les lettres pour l'animation
    const letters = document.querySelectorAll(".text .letter");
    const totalLength = 2 * (rectWidth + rectHeight); // Périmètre total

    letters.forEach((letter, index) => {
        const letterPosition = (index / letters.length) * totalLength;

        const updatePosition = (timestamp) => {
            const elapsed = timestamp % duration; // Temps écoulé dans un cycle
            const travel = (elapsed / duration) * totalLength; // Distance parcourue
            const currentPosition = (letterPosition + travel) % totalLength;

            let x = 0, y = 0, rotation = 0;

            // Mouvement avec orientation texte
            if (currentPosition <= rectWidth) {
                // Haut (gauche à droite)
                x = currentPosition;
                y = 0;
                rotation = 0;
            } else if (currentPosition <= rectWidth + rectHeight) {
                // Droite (haut à bas)
                x = rectWidth;
                y = currentPosition - rectWidth;
                rotation = 90;
            } else if (currentPosition <= 2 * rectWidth + rectHeight) {
                // Bas (droite à gauche)
                x = 2 * rectWidth + rectHeight - currentPosition;
                y = rectHeight;
                rotation = 180;
            } else {
                // Gauche (bas à haut)
                x = 0;
                y = totalLength - currentPosition;
                rotation = 270;
            }

            // Déplacer et orienter la lettre
            letter.style.transform = `translate(${x - rectWidth / 2}px, ${y - rectHeight / 2}px) rotate(${rotation}deg)`;
            requestAnimationFrame(updatePosition);
        };

        requestAnimationFrame(updatePosition);
    });

    // ****** SCEA + / -
    // Voir plus SCEA
    $(".options-scea span").hide();
    $(".options-scea span").slice(0, 12).show();

    $("#seeMore1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea span:hidden").slideDown();

        $("#seeMore1").hide();
        $("#seeLess1").show();
    });

    // Voir moins SCEA
    $("#seeLess1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea span").not(":lt(12)").slideUp();

        $("#seeMore1").show();
        $("#seeLess1").hide();
    });

    // ****** Gérer le changement d'onglet dans Détails
    const onglets = document.querySelectorAll('.onglet');
    const ongletDisplays = document.querySelectorAll('.onglet-display');

    onglets.forEach(onglet => {
        onglet.addEventListener('click', function () {
            // class is-active-onglet
            onglets.forEach(o => o.classList.remove('is-active-onglet'));
            this.classList.add('is-active-onglet');

            // class is-active-onglet-display
            ongletDisplays.forEach(display => display.classList.remove('is-active-onglet-display'));
            // Récupérer l'ID de l'onglet cliqué et activer la section de contenu correspondante
            const displayId = this.getAttribute('id').substring(1);
            document.getElementById(displayId).classList.add('is-active-onglet-display');
        });
    });

    // Clics sur les liens des prix chèques cadeaux
    $('.all-prices-vouchers a').on('click', function (event) {
        event.preventDefault();

        var targetId = $(this).attr('id');

        // Trouver l'élément correspondant dans le slider
        var targetElement = $(targetId);
        if (targetElement.length) {
            var index = $('.slider-vouchers').find('.owl-item').filter(function () {
                return $(this).find(targetId).length > 0;
            }).index();

            // Si un index valide est trouvé, déplacer le slider
            if (index !== -1) {
                $('.slider-vouchers').trigger('to.owl.carousel', [index, 600]);
            } else {
                console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
            }
        } else {
            console.error("Cible non trouvée pour :", targetId);
        }
    });

    // Détecter le changement dans Owl Carousel pour le .active
    $('.slider-vouchers').on('changed.owl.carousel', function (event) {
        var currentIndex = event.item.index;

        // Sélectionner l'élément actif dans le slider
        var activeSlide = $(event.target).find('.owl-item').eq(currentIndex).find('.presta-contain-vouchers');

        if (activeSlide.length) {
            var activeId = activeSlide.attr('id');
            console.log("Élément actif dans le slider :", activeId);

            $('.all-prices-vouchers a').removeClass('active');

            $('.all-prices-vouchers a[href="#' + activeId + '"]').addClass('active');

        }
    });
});

$(document).ready(function () {
    $('.home-slider_img').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 0,
        items: 1,
        dots: true,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-gallery').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 30,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 4,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-avis').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 30,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-other-pages').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 30,
        autoWidth: true,
        responsiveClass: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-page-page').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-giftcards').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 30,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-special-offer-detail').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        items: 1,
        margin: 30,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-vouchers').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 20,
        items: 1,
        autoHeight: true,
        responsiveClass: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
});