$(document).ready(function(){
	var ww = $(window).outerWidth(),
		wv = +$(window).outerHeight();

	var scrollBar = new SimpleBar($('#wrp')[0]),
		scrollContent = $('#wrp').find('.simplebar-scroll-content');

	$('.g_preloader, .header__logo i').remove();
	//preloader
//	anime({
//		targets: '.fancy-bulb',
//		translateY: [55,0],
//		rotate: [-180,-180],
//		elasticity: 750,
//		duration: 2515
//	});
//	var preloadAnimation = anime({
//		targets: '#preload',
//		d: 'M 21.5 57.7 L 29.47 41.06 L 38.22 56.47 L 44.81 37.24 L 52.75 66.85 L 56.92 37.39 L 61.36 58.92 L 76.14 49.98 L 84 55.61',
//		easing: 'easeInQuad',
//		duration: 1082,
//		direction: 'alternate',
//		loop: true
//	});
//	var elapsed = false,
//		done = false;
//	setTimeout(function(){
//		elapsed = true;
//	},3000);
//	$(window).on('load',function(){
//		if(elapsed){
//			$('body,html').addClass('active');
//			preloadAnimation.pause();
//			anime({
//				targets: '.fancy-bulb',
//				translateY: [0,-150],
//				rotate: [-180,-180],
//				duration: 1500,
//				delay: 1200,
//				complete: function(){
//					$('.g_preloader, .header__logo i').remove();
//				}
//			});
//			anime({
//				targets: '.header__logo i',
//				width: 95,
//				duration: 1000,
//				delay: 1000,
//				complete: function(){
//					$('.g_preloader, .header__logo i').remove();
//				}
//			});
//			setTimeout(function(){
//				$('.header__logo i').css({'width':'95px'});
//				done = true;
//			},1500);
//		}else{
//			setTimeout(function(){
//				$('body,html').addClass('active');
//				preloadAnimation.pause();
//				anime({
//					targets: '.fancy-bulb',
//					translateY: [0,-150],
//					rotate: [-180,-180],
//					duration: 1500,
//					delay: 1200,
//					complete: function(){
//						$('.g_preloader, .header__logo i').remove();
//					}
//				});
//				setTimeout(function(){
//					$('.header__logo i').css({'width':'95px'});
//					done = true;
//				},1500);
//			},3000);
//		}
//	});

	//fixed nav
	var header = $('.header'),
		headerHeight = $('.header').outerHeight(),
		elString = '<div class="header__temp" style="height: '+headerHeight+'px"></div>';

	header.wrap(elString);
	var headerAnimDone = false;
	scrollContent.scroll(function(){
		if($(this).scrollTop() > 1000){
			if(!header.hasClass('_fixed')){
				header.addClass('_fixed');
				anime.timeline()
					.add({
						targets: '.header__animation_path',
						d: ['M -0.5 0.5 L -0.5 37.5 C 435.5 50.5 435.5 50.5 960.5 50.5 C 1413.5 50.5 1921.5 37.5 1921.5 37.5 L 1919.5 0.5','M -0.5 0.5 L -0.5 42.5 C 319.75 42.5 640 42.5 960.25 42.5 C 1280.5 42.5 1600.75 42.5 1921 42.5 L 1919.5 0.5'],
						duration: 2850,
						elasticity: 860
					})
					.add({
						targets: header[0],
						translateY: ['-105%','0%'],
						duration: 550,
						offset: 0
					});
			}
		}else{
			if(header.hasClass('_fixed') && !headerAnimDone){
				headerAnimDone = true;
				anime.timeline({
					complete: function(){
						headerAnimDone = false;
						header.removeClass('_fixed').css({
							'transform': 'none'
						});
					}
				}).add({
					targets: header[0],
					translateY: '-105%',
					duration: 300
				});
			}
		}
	});
	if($(this).scrollTop() !== 0){
		header.addClass('_fixed').css({
			'transform': 'none',
			opacity: 1
		});
	}else{
		header.removeClass('_fixed').css({
			'transform': 'none',
			opacity: 1
		});
	}
//	$(window).on("wheel mousewheel", function(e){
//		if(!done){
//			return false;
//		}
//	});

	//sliders
	if($('.s_slider__slider').length){
		var sliderSwiper = new Swiper('.s_slider__slider_wrp',{
			slidesPerView: 1,
			autoHeight: true,
			effect: 'fade',
			speed: 857,
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: '.s_slider__arr_next',
				prevEl: '.s_slider__arr_prev',
			}
		});
	}
	if($('.s_solve__slider').length){
		var sovleSlider = new Swiper('.s_solve__slider_wrp',{
			spaceBetween: 60,
			slidesPerView: 1,
			autoHeight: true,
			loop: true,
			speed: 650,
			navigation: {
				nextEl: '.s_solve__arr_next',
				prevEl: '.s_solve__arr_prev',
			}
		});
		$('.s_solve__item').each(function(){
			var item = $(this),
				galleryTop = new Swiper(item.find('.s_solve__img'), {
					spaceBetween: 30,
					slidesPerView: 1,
					autoHeight: false,
					nested: true
				}),
				galleryThumbs = new Swiper(item.find('.s_solve__thumb'), {
					spaceBetween: 30,
					centeredSlides: true,
					slidesPerView: 3,
					touchRatio: 0.2,
					slideToClickedSlide: true,
					autoHeight: false,
					nested: true
				});
			galleryTop.controller.control = galleryThumbs;
			galleryThumbs.controller.control = galleryTop;
		});
	}
	if($('.s_trust__slider').length){
		var sovleSlider = new Swiper('.s_trust__slider_wrp',{
			spaceBetween: 30,
			slidesPerView: 5,
			loop: true,
			speed: 300,
			autoplay: true,
			navigation: {
				nextEl: '.s_trust__arr_next',
				prevEl: '.s_trust__arr_prev',
			}
		});
	}
	if($('.s_docs__slider').length){
		var sovleSlider = new Swiper('.s_docs__slider_wrp',{
			spaceBetween: 30,
			slidesPerView: 5,
			loop: true,
			autoplay: true,
			speed: 300,
			navigation: {
				nextEl: '.s_docs__arr_next',
				prevEl: '.s_docs__arr_prev',
			}
		});
	}
	if($('.s_catalog__row').length){
		var sovleSlider = new Swiper('.s_catalog__row',{
			spaceBetween: 30,
			slidesPerView: 3,
			loop: true,
			autoHeight: true,
			navigation: {
				nextEl: '.s_catalog__arr_next',
				prevEl: '.s_catalog__arr_prev',
			}
		});
	}

	//prevent only numbers
	$('._num, input[name="phone"]').on('keydown',function(e){
		-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()
	});

	//selects
	$('.g_select__head').click(function(e){
		var el = $(this),
			select = $('.g_select'),
			scrollContainer = select.find('.simplebar-scroll-content');
		if(!select.hasClass('_active')){
			scrollContainer.scrollTop(0);
		}
		select.toggleClass('_active');

	});
	$('.g_select__body a').click(function(e){
		e.preventDefault();
		var a = $(this),
			txt = a.text(),
			select = a.closest('.g_select'),
			input = select.find('input'),
			head = select.find('.g_select__head span');
		a.addClass('_current').siblings().removeClass('_current');
		input.val(txt);
		head.text(txt);
		select.removeClass('_error _active');

	});

	//g_txt
	if($('.g_txt table').length){
		$('.g_txt table').wrap('<div class="g_txt__table"></div>');
	}

	//inputs
	$('input,textarea').change(function(){
		if($(this).val()==''){
			$(this).removeClass('_active');
		}else{
			$(this).addClass('_active');
		}
	});

	//scrolls
	if($('._scroll').length){
		$('._scroll').each(function(){
			var scroll = new SimpleBar($(this)[0]);
		});
	}

	//anchors
	$('._anchor').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var el = $(this).attr('href'),px;
		if(el==0){
			px = 0;
		}else{
			px = $('.'+el).offset().top;
		}
		scrollContent.stop().animate({scrollTop:px},500);
	});

	////forms
	//validate
	$("._validate").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: false},
				phone: {required: true},
				name: {required: true},
				mail: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				var data = new FormData(it[0]);
				$.ajax({
					url: 'mail.php',
					type: 'POST',
					data: data,
					cache: false,
					processData: false,
					contentType: false,
					success: function( respond, textStatus, jqXHR ){
						$('.popup').removeClass('_visible');
						var name = 'thnx'
						popup = $('.popup_'+name),
							popup_h = popup.outerHeight(),
							popup_w = popup.outerWidth(),
							h = $(window).height(),
							px = window.pageYOffset + h/2 - popup_h/2;
						popup.css({
							'top': px+'px',
							'margin-left': '-'+ popup_w/2 +'px',
						});
						$('.popup.popup_'+name+', .overlay').addClass('_visible');
						setTimeout(function () {
							if ($('.popup_thnx').hasClass('_visible')) {
								$('.popup_thnx, .overlay').removeClass('_visible');
							}
						}, 2000);
						$("form").trigger( 'reset' );
					},
					error: function( jqXHR, textStatus, errorThrown ){
						console.log('ОШИБКИ AJAX запроса: ' + textStatus );
					}
				});
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});
	//search form
	(function(){
		var it = $('.header__search');
		it.validate({
			rules: {
				search: {required:true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
			},
			success: function () {

			},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	}());

	//uload zone
	var uploadForm = $('.s_category__form');
	if(uploadForm.length){
		uploadForm.dropzone({
			url: "/",
			maxFiles: 1,
			previewsContainer: uploadForm.find('.g_upload__info')[0],
			previewTemplate: '<div class="g_upload__item"><div class="g_upload__item_name" data-dz-name></div><small data-dz-size></small><span class="g_upload__item_progress" data-dz-uploadprogress></span><i data-dz-remove>&times;</i></div>',
			maxFilesize: 25, // MB
			clickable: uploadForm.find('.g_upload')[0],
			//		acceptedFiles: '.jpeg,.jpg,.png,.bmp,.svg,.pdf,.doc,.docx,.psd',
			init: function() {
				this.on("maxfilesexceeded", function(file) {
					this.removeAllFiles();
					this.addFile(file);
				});
				this.on("addedfile", function() {
					if (this.files[1]!=null){
						this.removeFile(this.files[0]);
					}
					uploadForm.find('.g_upload__btn').addClass('_hidden');
				});
				this.on("removedfile", function() {
					uploadForm.find('.g_upload__btn').removeClass('_hidden');
				});
			}
		});
	}

	//header search
	$('.header__search_btn').click(function(e){
		e.preventDefault();
		var el = $(this),
			cX = e.pageX,
			cY = e.pageY - el.offset().top,
			path = $('#circle circle');
		path.attr('cx',cX);
		path.attr('cy',cY);
		setTimeout(function(){
			$('.header__search input').focus();
		},1200);
		anime({
			targets: path[0],
			r: $(window).outerWidth()+300,
			easing: 'easeInQuad',
			duration: 1200
		});
	});
	$('.header__search_close').click(function(e){
		var el = $(this),
			cX = e.pageX - el.offset().left,
			cY = e.pageY - el.offset().top,
			path = $('#circle circle');
		path.attr('cx',cX);
		path.attr('cy',cY);
		anime({
			targets: path[0],
			r: 0,
			easing: 'easeOutQuint',
			duration: 1200
		});
		setTimeout(function(){
			el.prevAll('.g_input').find('input').removeClass('_error');
			$('form').trigger('reset');
		},400);
	});

	////gallery
	if($('.s_should__video').length){
		$('.s_should__video').lightGallery({
			selector: '.s_should__video_img'
		});
	}
	if($('.s_reviews__body').length){
		$('.s_reviews__body').lightGallery({
			selector: '.s_reviews__item_img'
		});
	}
	if($('.s_docs__slider').length){
		$('.s_docs__slider').lightGallery({
			selector: '.s_docs__item',
			counter: false
		});
	}
	if($('.s_gallery').length){
		$('.s_gallery').lightGallery({
			selector: '.s_gallery__item_img'
		});
	}

	////anime.js
	//btn animation
	$('.g_btn').each(function(){
		var gBtn = $(this),
			path = gBtn.find('.g_btn__path'),
			span = gBtn.find('span');
		gBtn.on('click',function(){
			gBtnClick(path[0],span[0]);
		}).on('mouseenter',function(){
			gBtnHover(path[0],span[0]);
		});
	});
	function gBtnClick(path,span){
		anime.remove([path,span]);
		anime({
			targets: path,
			d: ['M 12 6.25 C 41.25 10.25 41.25 10.25 109.5 10.25 C 171.75 10.25 207 6.25 207 6.25 C 210.866 6.25 214 9.384 214 13.25 C 214 14.57 209.5 19.03 209.5 27.25 C 209.411 32.286 210.994 37.209 214 41.25 C 214 45.116 210.866 48.25 207 48.25 C 177.25 45 177.25 45 109.5 45 C 34 45 12 48.25 12 48.25 C 8.134 48.25 5 45.116 5 41.25 C 7.665 37.071 9.054 32.206 9 27.25 C 8.997 22.302 7.611 17.453 5 13.25 C 5 9.384 8.134 6.25 12 6.25 Z',
			'M 12 6.25 C 44.5 6.25 77 6.25 109.5 6.25 C 142 6.25 174.5 6.25 207 6.25 C 210.866 6.25 214 9.384 214 13.25 C 214 17.917 214 22.583 214 27.25 C 213.91 32.25 213.91 32.25 214 41.25 C 214 45.116 210.866 48.25 207 48.25 C 174.5 48.25 142 48.25 109.5 48.25 C 77 48.25 44.5 48.25 12 48.25 C 8.134 48.25 5 45.116 5 41.25 C 5 35 5.05 31.71 5 26.75 C 4.95 21.79 5 18.25 5 13.25 C 5 9.384 8.134 6.25 12 6.25 Z'],
			duration: 2350,
			elasticity: 800,
			offset: 0
		});
		anime({
			targets: span,
			scale: [.9, 1],
			duration: 600
		});
	}
	function gBtnHover(path,span){
		anime.remove([path,span]);
		var gBtnHoverAnimation = anime({
			targets: path,
			d: ['M 12 6.25 C 54.67 3.67 54.67 3.67 110 3.67 C 172.25 3.67 207 6.25 207 6.25 C 210.866 6.25 214 9.384 214 13.25 L 214 26.75 C 213.91 31.75 214 35 214 41.25 C 214 45.116 210.866 48.25 207 48.25 C 173.83 51.83 173.83 51.83 110 51.83 C 39.17 51.83 12 48.25 12 48.25 C 8.134 48.25 5 45.116 5 41.25 C 5 29.33 5.05 31.79 5 26.83 C 5 22.303 5 17.777 5 13.25 C 5 9.384 8.134 6.25 12 6.25 Z','M 12 6.25 C 44.5 6.25 77 6.25 109.5 6.25 C 142 6.25 174.5 6.25 207 6.25 C 210.866 6.25 214 9.384 214 13.25 L 214 27.25 C 213.91 32.25 213.91 32.25 214 41.25 C 214 45.116 210.866 48.25 207 48.25 C 174.5 48.25 142 48.25 109.5 48.25 C 77 48.25 44.5 48.25 12 48.25 C 8.134 48.25 5 45.116 5 41.25 C 5 35 5.05 31.71 5 26.75 C 4.95 21.79 5 18.25 5 13.25 C 5 9.384 8.134 6.25 12 6.25 Z'],
			duration: 2850,
			elasticity: 870,
			offset: 0
		});
		var gBtnSpanHoverAnimation = anime({
			targets: span,
			scale: [1.1,1],
			duration: 1200
		});
	}

	//arrows
	$('.g_arr>div').each(function(){
		var gBtn = $(this),
			svg = gBtn.find('svg');
		gBtn.on('click',function(){
			gArrClick(svg[0],gBtn[0]);
		});
	});
	function gArrClick(svg,btn){
		anime.remove([svg,btn]);
		anime({
			targets: svg,
			scale: [0.5,1],
			duration: 850,
			offset: 0
		});
		anime({
			targets: btn,
			borderRadius: ['2rem','0.3rem']
		})
	}

	//link animation
	$('.g_link').each(function(){
		var gLink = $(this),
			path = gLink.find('.g_link__path'),
			span = gLink.find('span');
		gLink.on('click',function(){
			gLinkClick(path[0]);
		}).on('mouseenter',function(){
			gLinkHover(path[0]);
		});
	});
	function gLinkClick(path){
		anime.remove(path);
		anime({
			targets: path,
			d: ['M 0 7.5 C 96.77 -1.35 96.77 -1.35 54.5 7.5 C 11.5 16.5 195.9 -4.05 147.5 8.5 C 120.5 15.5 283.5 -4.5 247.5 7.5 C 220.33 16.56 300 7.5 300 7.5',
				'M 0 7.5 C 25 7.5 50 7.5 75 7.5 C 100 7.5 125 7.5 150 7.5 C 175 7.5 200 7.5 225 7.5 C 250 7.5 275 7.5 300 7.5'],
			duration: 2850,
			easing: 'easeOutElastic',
			elasticity: 800,
			offset: 0
		});
	}
	function gLinkHover(path){
		anime.remove(path);
		anime({
			targets: path,
			d: ['M 0 7.5 C 12.16 15.61 12.16 15.61 54.5 7.5 C 101.5 -1.5 101.5 12.5 151.5 11.5 C 203.5 10.5 211.27 -0.26 247.5 7.5 C 264.818 11.066 282.682 11.066 300 7.5',
			'M 0 7.5 C 25 7.5 50 7.5 75 7.5 C 100 7.5 125 7.5 150 7.5 C 175 7.5 200 7.5 225 7.5 C 250 7.5 275 7.5 300 7.5'],
			duration: 2825,
			easing: 'easeOutElastic',
			elasticity: 842,
			offset: 0
		});
	}

	//input focus animation
	$('.g_input').each(function(){
		var gInput = $(this),
			path = gInput.find('.g_input__path'),
			input = gInput.find('input');
		input.focus(function(){
			gInputClick(path[0]);
		});
	});
	function gInputClick(path){
		anime.remove(path);
		anime({
			targets: path,
			d: ['M 0 7.5 C -19.0 15.61 12.16 15.61 54.5 7.5 C 101.5 -8.7 101.5 12.5 151.5 11.5 C 203.5 10.5 211.27 -11.2 260.2 2.7 C 280.0 24.5 282.682 1.3 300 5.7',
				'M 0 7.5 C 25 7.5 50 7.5 75 7.5 C 100 7.5 125 7.5 150 7.5 C 175 7.5 200 7.5 225 7.5 C 250 7.5 275 7.5 300 7.5'],
			duration: 2850,
			elasticity: 800,
			offset: 0
		});
	}

	//svg icons animation
	if($('.s_why').length){
		var flag = true;
		$(window).scroll(function(e){
			if(inViewport($('.s_why__item')[0]) && flag){
				flag = false;
				var i = 0;
				$('.s_why__item').each(function(){
					var path = $(this).find('path');
					i++;
					anime({
						targets: path[0],
						strokeDashoffset: [anime.setDashoffset, 0],
						easing: 'easeInOutSine',
						duration: 2000,
						delay: function(el) { return i * 450 },
						begin: function(el){
							setTimeout(function(){
								path.css('transition','2s')
									.addClass('_completed');
							},1000);
						}
					});
				});
			}
		});
	}
});


//mobile hover disable
function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/android/i.test(userAgent)) {
		return "Android";
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return null;
}

if (getMobileOperatingSystem()) {
	try {
		for (var si in document.styleSheets) {
			var styleSheet = document.styleSheets[si];
			if (!styleSheet.rules) continue;

			for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
				if (!styleSheet.rules[ri].selectorText) continue;

				if (styleSheet.rules[ri].selectorText.match(':hover')) {
					styleSheet.deleteRule(ri);
				}
			}
		}
	} catch (ex) {}
}

//in viewport
function inViewport(el) {
	var rect     = el.getBoundingClientRect(),
		vWidth   = window.innerWidth || doc.documentElement.clientWidth,
		vHeight  = window.innerHeight || doc.documentElement.clientHeight,
		efp      = function (x, y) { return document.elementFromPoint(x, y) };

	// Return false if it's not in the viewport
	if (rect.right < 0 || rect.bottom < 0
		|| rect.left > vWidth || rect.top > vHeight)
		return false;

	// Return true if any of its four corners are visible
	return (
		el.contains(efp(rect.left,  rect.top))
		||  el.contains(efp(rect.right, rect.top))
		||  el.contains(efp(rect.right, rect.bottom))
		||  el.contains(efp(rect.left,  rect.bottom))
	);
}
