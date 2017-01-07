$(document).on('click', 'button.collapse-navigation', function() {
  $('.wrapper-header .header-navigation').toggleClass('expanded');
});

/* POP UP */
$(document).ready(function() {
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
});