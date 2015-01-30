$(document).ready(function() {
	sliderInit();
});

$(document).on('click', '.slider span', function() {
	sliderShow($(this));
	autoSlideChange();
});

var sliderDelay = 3000;
var sliderIntervalId;
var stopShowingOnMouseenter = true;

function sliderInit() {
	var elems = '';
	var slide = {};
	var firstSlide = $('.slider li').filter(':first');
	var numOfSlides = $('.slider li').length;

	for(i = 0; i < numOfSlides; i++) {
		slide = i != 0 ? slide.next() : firstSlide;
		slide.addClass('slide-'+i);

		elems += '<span rel="' + i + '"></span>';
	}

	firstSlide.addClass('show').show();

	$('.slider').append(''
	+	'<div class="nav">'
	+		elems
	+	'</div>'
	);

	$('.slider .nav span').filter(':first').addClass('on');

	$('.slider').bind("mouseenter", function () {
        stopShowingOnMouseenter = false;
    }).bind("mouseleave", function () {
        stopShowingOnMouseenter = true;
    });

	autoSlideChange();
}

function autoSlideChange() {
	if (sliderIntervalId && stopShowingOnMouseenter) {
		var count = $('.slider li').length;
		var slideNow = $('span.on');
		var rel = parseInt(slideNow.attr('rel'));
		var slideNext = (rel + 1) === count ? $('.nav span').filter(':first') : slideNow.next('span');
		sliderShow(slideNext);
	}
	sliderIntervalId = setTimeout(autoSlideChange, sliderDelay);
}

function sliderShow(obj) {
	clearTimeout(sliderIntervalId);
	sliderIntervalId = 0;

	var duration = 500;
	var slideWidth = $('.slider li').width();
	var rel = parseInt(obj.attr('rel'));
	var prevSlide = $('.slider ul .shown');
	var nextSlide = $('.slider ul .slide-'+rel);

	$('.slider').find('span').removeClass('on');
	obj.addClass('on');
	nextSlide.addClass('shown').fadeIn(duration);
	prevSlide.removeClass('shown').fadeOut(duration);
}