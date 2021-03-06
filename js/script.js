(function($) {
  "use strict";

//------------------------------------- Waiting for the entire site to load ------------------------------------------------//

jQuery(window).load(function() { 
		jQuery("#loaderInner").fadeOut(); 
		jQuery("#loader").delay(400).fadeOut("slow"); 
});

$(document).ready(function(){
	
	

if (!(/android|blackberry|windows phone|iphone|ipod/i).test(navigator.userAgent.toLowerCase())) {

	var header = $('.mainHeader'),
		pos = header.offset();

		$(window).scroll(function(){
			if($(this).scrollTop() > pos.top+20 && header.hasClass('default')){
				header.fadeOut('fast', function(){
					$(this).removeClass('default').addClass('switchedHeader').slideDown(200);
				});
			} else if($(this).scrollTop() <= pos.top+20 && header.hasClass('switchedHeader')){
				header.slideUp(200, function(){
					$(this).removeClass('switchedHeader').addClass('default').fadeIn(200);
				});
			}
	});

}

	
	
//------------------------------------- Navigation setup ------------------------------------------------//

$('a.scroll').smoothScroll({
        speed: 800,
        offset: -78
});



$('.showOffsetNav').click(function(e){
	
	e.preventDefault();
		$('.wrapper').toggleClass('showNav');
		$('.mainHeader').toggleClass('showNav');
		$('.offestNavCanvas').toggleClass('showNav');

	if($(this).hasClass('showNav')){
		$('.wrapper').toggleClass('showNav');
		$('.mainHeader').toggleClass('showNav');
		$('.offestNavCanvas').toggleClass('showNav');
		
		
	}
	
});


//------------------------------------- End navigation setup ------------------------------------------------//



//---------------------------------- Main slider setup-----------------------------------------//

$('.teaser').flexslider({
	animation: "fade",
	slideshow: true,
	directionNav:false,
	controlNav: false,
	animationSpeed: 1500
});


$('.teaser .slides li').css('height', $(window).height());


for(var i = 0; i < $('.teaser .slides li').length; i++){

    var path = $('.teaser .slides li').eq(i).find('img.slide').attr('src');
	$('.teaser .slides li').eq(i).addClass('parallax');
    $('.teaser .slides li').eq(i).css('backgroundImage', 'url("' + path + '")');
    $('.teaser .slides li').eq(i).find('img.slide').detach();

}


$(document).scroll(function () {

        var treshhold = Math.round($(window).scrollTop() / 5);
        $('li.parallax').css('backgroundPosition', '100% ' + treshhold + 'px');    
});

//---------------------------------- End main slider setup-----------------------------------------//



//---------------------------------- Site slider-----------------------------------------//


$('.postSlider, .postSliderLarge, .projectSlider').flexslider({
	animation: "slide",
	slideshow: true,
	directionNav:false,
	controlNav: true
});


//---------------------------------- End site slider-----------------------------------------//



//---------------------------------- Portfolio -----------------------------------------//

$(".itemDesc, .prjLink").css({ opacity: 0 });

//--------------------------------- Hover animation for the elements of the portfolio --------------------------------//
				
	
$('.itemDesc, .latestDesc, .prjLink').hover( function(){ 
	$(this).stop().animate({ opacity: 1 }, 'slow');
}, function(){ 
	$(this).stop().animate({ opacity: 0 }, 'slow'); 
});

	$('.itemDesc, .prjLink').hover(function () {
    var projDesc = $(this).find('.itemDesc, .prjLink');
    var offset = ($(this).height() / 2) - (projDesc.height() / 2);
    $(this).find('.itemDescInner, .prjLinkInner').css('padding-top', offset -30);
});
			

//--------------------------------- End hover animation for the elements of the portfolio --------------------------------//

//-----------------------------------Initilaizing magnificPopup for the portfolio-------------------------------------------------//
$('.folio').magnificPopup({
					  type: 'image'
					});
					
					
					$('.popup-youtube, .popup-vimeo').magnificPopup({
						disableOn: 700,
						type: 'iframe',
						mainClass: 'mfp-fade',
						removalDelay: 160,
						preloader: false,

						fixedContentPos: false
					});

				
//-----------------------------------End initilaizing fancybox for the portfolio-------------------------------------------------//

	//--------------------------------- Sorting portfolio elements with quicksand plugin  --------------------------------//
	
		var $portfolioClone = $('.portfolio').clone();

		$('.filter a').click(function(e){
			$('.filter li').removeClass('current');	
			var $filterClass = $(this).parent().attr('class');
			if ( $filterClass == 'all' ) {
				var $filteredPortfolio = $portfolioClone.find('li');
			} else {
				var $filteredPortfolio = $portfolioClone.find('li[data-type~=' + $filterClass + ']');
			}
			$('.portfolio').quicksand( $filteredPortfolio, { 
				duration: 800,
				easing: 'easeInOutQuad' 
			}, function(){
					$('.itemDesc').hover( function(){ 
						$(this).stop().animate({ opacity: 1 }, 'slow');
					}, function(){ 
						$(this).stop().animate({ opacity: 0 }, 'slow'); 
					});
					
						$('.itemDesc').hover(function () {
					    var projDesc = $(this).find('.itemDesc');
					    var offset = ($(this).height() / 2) - (projDesc.height() / 2);
					    $(this).find('.itemDescInner').css('padding-top', offset -30);
					});
					
					


//------------------------------ Reinitilaizing fancybox for the new cloned elements of the portfolio----------------------------//


			
			$('.folio').magnificPopup({
								  type: 'image'
								});


								$('.popup-youtube, .popup-vimeo').magnificPopup({
									disableOn: 700,
									type: 'iframe',
									mainClass: 'mfp-fade',
									removalDelay: 160,
									preloader: false,

									fixedContentPos: false
								});


//-------------------------- End reinitilaizing fancybox for the new cloned elements of the portfolio ----------------------------//

			});


			$(this).parent().addClass('current');
			e.preventDefault();
		});

//--------------------------------- End sorting portfolio elements with quicksand plugin--------------------------------//


//---------------------------------- End portfolio-----------------------------------------//





//---------------------------------- Form validation-----------------------------------------//




$('#submit').click(function(){ 

	$('input#name').removeClass("errorForm");
	$('textarea#message').removeClass("errorForm");
	$('input#email').removeClass("errorForm");
	
	var error = false; 
	var name = $('input#name').val(); 
	if(name == "" || name == " ") { 
		error = true; 
		$('input#name').addClass("errorForm");
	}
	
	
		var msg = $('textarea#message').val(); 
		if(msg == "" || msg == " ") {
			error = true;
			$('textarea#message').addClass("errorForm");
			
		}
	
	var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; 
	var email = $('input#email').val(); 
	if (email == "" || email == " ") { 
		$('input#email').addClass("errorForm");
		error = true;
	}else if (!email_compare.test(email)) { 
		$('input#email').addClass("errorForm");
		error = true;
	}

	if(error == true) {
		return false;
	}

	var data_string = $('.contactForm form, .replyForm form').serialize(); 
	

	$.ajax({
		type: "POST",
		url: $('.contactForm form, .replyForm form').attr('action'),
		data: data_string,
		
		success: function(message) {
				if(message == 'SENDING'){
					$('#success').fadeIn('slow');
				}
				else{
					$('#error').fadeIn('slow');
				}
					}
			
	});

	return false; 
});



//---------------------------------- End form validation-----------------------------------------//


//--------------------------------- Twitter feed --------------------------------//


jQuery(".tweets").tweet({
  join_text: false,
  username: "BenaissaGhrib", // Change username here
  modpath: './twitter/',
  avatar_size: false,
  count: 1,
  auto_join_text_default: ' we said, ',
  auto_join_text_ed: ' we ',
  auto_join_text_ing: ' we were ',
  auto_join_text_reply: ' we replied to ',
  auto_join_text_url: ' we were checking out ',
  loading_text: 'Loading tweets...'

});



//--------------------------------- End twitter feed --------------------------------//

//--------------------------------- Random images-------------------------------//

$(function() {
    var randomImg = ['r1.jpg', 'r2.jpg', 'r3.jpg', 'r4.jpg', 'r5.jpg', 'r6.jpg'];
    $('.imgTS').css({'background-image': 'url(images/teaserImages/' + randomImg[Math.floor(Math.random() * randomImg.length)] + ')'});
   });        

//--------------------------------- End random images--------------------------------//



//---------------------------------- Instagram feed -----------------------------------------//

var instaFeed = new Instafeed({
        get: 'user',
        userId: '305801553',
        accessToken: '305801553.1677ed0.3d872300c10c4ff687868875ee8abc5d',
		limit: 10,
		template: '<li><a href="{{link}}"><img src="{{image}}"/></a></li>'
    });
instaFeed.run();


//---------------------------------- End instagram feed -----------------------------------------//



});

})(jQuery);
