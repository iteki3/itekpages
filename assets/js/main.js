/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

					}
				});
				
				
				
			})(jQuery);
	

// 	$(function() {
//   $("#tabs").tabs({
//     show: { effect: "blind", direction: "right", duration: 300 }
//   });
//   $( "#accordion" ).accordion();

//   var btn = $('#accordion li a');
//   var wrapper = $('#accordion li');

//   $(btn).on('click', function() {
//     $(btn).removeClass('active');
//     $(btn).parent().find('.addon').removeClass('fadein');
    
//     $(this).addClass('active');
//     $(this).parent().find('.addon').addClass('fadein');
//   });
// });




//-----------------------------------------------------

// var pos = 0;
// //number of slides
// var totalSlides = $('#slider-wrap1 ul li').length;
// //get the slide width
// var sliderWidth = $('#slider-wrap1').width();


// $(document).ready(function () {


// 	/*****************
// 	 BUILD THE SLIDER
// 	*****************/
// 	//set width to be 'x' times the number of slides
// 	$('#slider-wrap1 ul#slider').width(sliderWidth * totalSlides);

// 	//next slide 	
// 	$('#next').click(function () {
// 		slideRight();
// 	});

// 	//previous slide
// 	$('#previous').click(function () {
// 		slideLeft();
// 	});



// 	/*************************
// 	 //*> OPTIONAL SETTINGS
// 	************************/
// 	//automatic slider
// 	var autoSlider = setInterval(slideRight, 3000);

// 	//for each slide 
// 	$.each($('#slider-wrap1 ul li'), function () {
// 		//set its color
// 		var c = $(this).attr("data-color");
// 		$(this).css("background", c);

// 		//create a pagination
// 		var li = document.createElement('li');
// 		$('#pagination-wrap1 ul').append(li);
// 	});

// 	//counter
// 	countSlides();

// 	//pagination
// 	pagination();

// 	//hide/show controls/btns when hover
// 	//pause automatic slide when hover
// 	$('#slider-wrap1').hover(
// 		function () { $(this).addClass('active'); clearInterval(autoSlider); },
// 		function () { $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
// 	);



// });//DOCUMENT READY



// /***********
//  SLIDE LEFT
// ************/
// function slideLeft() {
// 	pos--;
// 	if (pos == -1) { pos = totalSlides - 1; }
// 	$('#slider-wrap1 ul#slider').css('left', -(sliderWidth * pos));

// 	//*> optional
// 	countSlides();
// 	pagination();
// }


// /************
//  SLIDE RIGHT
// *************/
// function slideRight() {
// 	pos++;
// 	if (pos == totalSlides) { pos = 0; }
// 	$('#slider-wrap1 ul#slider').css('left', -(sliderWidth * pos));

// 	//*> optional 
// 	countSlides();
// 	pagination();
// }




// /************************
//  //*> OPTIONAL SETTINGS
// ************************/
// function countSlides() {
// 	$('#counter').html(pos + 1 + ' / ' + totalSlides);
// }

// function pagination() {
// 	$('#pagination-wrap1 ul li').removeClass('active');
// 	$('#pagination-wrap1 ul li:eq(' + pos + ')').addClass('active');
// }





// ----------------------------------------------
// ( function($) {
  
//   $(document).ready(function() {
    
//     var s           = $('.slider'),
//         // sWrapper    = s.find('.slider-wrapper'),
//         sItem       = s.find('.slide1'),
//         btn         = s.find('.slider-link1'),
//         sWidth      = sItem.width(),
//         sCount      = sItem.length,
//         slide_date  = s.find('.slide1-date'),
//         slide_title = s.find('.slide1-title'),
//         slide_text  = s.find('.slide1-text'),
//         slide_more  = s.find('.slide1-more'),
//         slide_image = s.find('.slide1-image img'),
//         sTotalWidth = sCount * sWidth;
    
//     sWrapper.css('width', sTotalWidth);
//     sWrapper.css('width', sTotalWidth);
    
//     var clickCount  = 0;
    
//     btn.on('click', function(e) {
//       e.preventDefault();

//       if( $(this).hasClass('next1') ) {
        
//         ( clickCount < ( sCount - 1 ) ) ? clickCount++ : clickCount = 0;
//       } else if ( $(this).hasClass('prev1') ) {
        
//         ( clickCount > 0 ) ? clickCount-- : ( clickCount = sCount - 1 );
//       }
//       TweenMax.to(sWrapper, 0.4, {x: '-' + ( sWidth * clickCount ) })


//       //CONTENT ANIMATIONS

//       var fromProperties = {autoAlpha:0, x:'-50', y:'-10'};
//       var toProperties = {autoAlpha:0.8, x:'0', y:'0'};

//       TweenLite.fromTo(slide1_image, 1, {autoAlpha:0, y:'40'}, {autoAlpha:1, y:'0'});
//       TweenLite.fromTo(slide1_date, 0.4, fromProperties, toProperties);
//       TweenLite.fromTo(slide1_title, 0.6, fromProperties, toProperties);
//       TweenLite.fromTo(slide1_text, 0.8, fromProperties, toProperties);
//       TweenLite.fromTo(slide1_more, 1, fromProperties, toProperties);

//     });
          
//   });
// })(jQuery);

// $('.overlay').addClass('overlay-blue');




// pruebaaaaa
