$(document).ready(function() {
	// set variables
	var speed = 500; //fade speed
	var autoSwitch = true; // auto slider option
	var autoSwitchSpeed = 4000; // auto slider speed

	// Add initial active class
	$('.slide').first().addClass('active');

	// Hide all slides
	$('.slide').show();

	// Next handler

	$('#next').on('click', nextSlide);

	$('#prev').on('click', prevSlide);

	if(autoSwitch == true) {
		setInterval(nextSlide, autoSwitchSpeed);
	}

	//Switch to next slide

	function nextSlide() {
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':last-child')) {
			$('.slide').first().addClass('active');
		} else {
			$('.oldActive').next().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}

	// Switch to the previous slide
	function prevSlide() {
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':first-child')) {
			$('.slide').last().addClass('active');
		} else {
			$('.oldActive').prev().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}
});

