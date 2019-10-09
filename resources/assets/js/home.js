$('.landing__owl-slider').owlCarousel({
    items: 1,
    animateOut: 'fadeOut',
    loop: true,
    autoplay: true,
    margin: 10,
    dots: false,
});


$('.popular-book__book-item-slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    center: true,
    autoplay: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 6
        }
    }
});

$('.owl-carousel').find('.owl-nav').removeClass('disabled');
$('.owl-carousel').on('changed.owl.carousel', function (event) {
    $(this).find('.owl-nav').removeClass('disabled');
});

$('.popular-book__book-item-detail-slider').owlCarousel({
    items: 1,
    animateOut: 'fadeOut',
    loop: true,
    autoplay: false,
    margin: 10,
    nav: true,
    dots: false,
});

$('.meet-out-staff__slider').owlCarousel({
    items: 3,
    animateOut: 'fadeOut',
    loop: true,
    autoplay: false,
    margin: 60,
    navigation: false,
    dots: false,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 3,
        }
    }
});

$('.what-people-say__owl-slider').owlCarousel({
    items: 1,
    animateOut: 'fadeOut',
    loop: true,
    autoplay: false,
    margin: 60,
    nav: false,
    dot: true,
    pagination: false,
    navigation: true,
});
