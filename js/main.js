var preloadAnimation, scrollContent, pc = false, md = false, mb = false;
$(document).ready(function(){
	var ww = $(window).outerWidth(),
		wv = $(window).outerHeight();
	var headerContainerOffset = $('.header .container').offset().left;
	$('.header__logo i').css({'width':'calc(100vw - '+headerContainerOffset*2+'px)'});


	if(getBrowser().name=="Safari"){
		$('body,html').css({'line-height':'1.3'});
		$('.g_btn').css({'padding-top':'.33rem'});
	}

	if(Modernizr.mq('only screen and (min-width: 1200px)')){
		pc = true;
	}
	if(Modernizr.mq('only screen and (max-width: 1000px)')){
		md = true;
	}
	if(Modernizr.mq('only screen and (max-width: 777px)')){
		mb = true;
	}

	var scrollBar = new SimpleBar($('#wrp')[0]);
	scrollContent = $('#wrp').find('.simplebar-scroll-content');

	if(mb){
		$('.g_preloader, .header__logo i').remove();
	}else{
		anime({
			targets: '.fancy-bulb',
			translateY: [55,0],
			rotate: [-180,-180],
			elasticity: 750,
			duration: 2515
		});
		preloadAnimation = anime({
			targets: '#preload',
			d: 'M 21.5 57.7 L 29.47 41.06 L 38.22 56.47 L 44.81 37.24 L 52.75 66.85 L 56.92 37.39 L 61.36 58.92 L 76.14 49.98 L 84 55.61',
			easing: 'easeInQuad',
			duration: 1082,
			direction: 'alternate',
			loop: true
		});
		disableScroll(scrollContent);
	}
	//fixed nav
	if(!mb){
		var header = $('.header'),
			headerHeight = $('.header').outerHeight(),
			elString = '<div class="header__temp" style="height: '+headerHeight+'px"></div>';

		header.wrap(elString);
		var headerAnimDone = false;


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
		if($('.s_anim').length & !md){
			header.addClass('_fixed').css({
				'transform': 'none',
				opacity: 1
			});
			var sAnim = $('.s_anim'),
				sAnimTxt = $('.s_anim__txt'),
				scrollDistance = sAnim.height() - $(window).outerHeight() + headerHeight,
				supcan = sAnim[0],
				supcanbody = $('.s_anim__body')[0],
				supcanlength = 1100,
				scanimg = [];
			for (var i = 0; i < 19; i++){
				scanimg[i] = document.getElementById('scanimg' + i); // задание списка картинок в анимации
			}
			var scanimgs = ['0', '0', '0', [-80, 10], [-228, 20], [-20, -35], [62, -97], [157.9, -15.25], [157, -14.5], [100, -9], [-84, -241], [-154, -135], [-26, 67], [13, 176], [-12, 158], [0, 144], [28, -5], [250, -28] ];

			function canscrol(){
				var scrollin = scrollContent.scrollTop();
				if(scrollin < scrollDistance){
					if(scrollin > scrollDistance - 300){
						supcanbody.style.position = 'fixed';
						sAnimTxt.addClass('_visible');
						if(!$('.s_anim__head').hasClass('_hidden')){
							$('.s_anim__head').addClass('_hidden');
						}
					}else{
						supcanbody.style.position = 'fixed';
						scalecof = scrollin / (supcanlength) / 2.6;
						supcanbody.style.transform = 'scale(' + (1.5 - scalecof) + ') translate3d('+ (6 - (20.2 * scalecof))+'%,'+( -6.5 - (-21.5 * scalecof))+'%,0)';
						canmat = scrollin / supcanlength;
						for(var i = 4; i < 19; i++){
							scanimg[i].style.transform = 'translate3d(' + (scanimgs[i - 1][0] * canmat) + '%,' + (scanimgs[i - 1][1] * canmat) + '%,0)';
						}
						sAnimTxt.removeClass('_visible');
						if($('.s_anim__head').hasClass('_hidden')){
							$('.s_anim__head').removeClass('_hidden');
						}
					}
				}else{
					supcanbody.style.position = 'absolute';
				}
			}
			canscrol();

			scrollContent.scroll(function(e){
				canscrol();
			});
		}else{
			scrollContent.scroll(function(e){
				if($(this).scrollTop() > 1000){
					if(!header.hasClass('_fixed')){
						header.addClass('_fixed');
						$('.footer__gotop').addClass('_fixed');
						if(pc){
							anime.remove(header[0]);
							anime.timeline().add({
								targets: header[0],
								translateY: ['-105%','0%'],
								duration: 1550,
								offset: 0
							}).add({
								targets: '.header__animation_path',
								d: ['M -0.5 0.5 L -0.5 37.5 C 435.5 50.5 435.5 50.5 960.5 50.5 C 1413.5 50.5 1921.5 37.5 1921.5 37.5 L 1919.5 0.5'],
								duration: 350,
								offset: '-=1450'
							}).add({
								targets: '.header__animation_path',
								d: ['M -0.5 0.5 L -0.5 42.5 C 319.75 42.5 640 42.5 960.25 42.5 C 1280.5 42.5 1600.75 42.5 1921 42.5 L 1919.5 0.5'],
								duration: 650,
								elasticity: 360,
								offset: '-=1150'
							});
						}
					}
				}else{
					if(header.hasClass('_fixed') && !headerAnimDone){
						headerAnimDone = true;
						if(pc){
							$('.footer__gotop').removeClass('_fixed');
							anime.remove(header[0]);
							anime.timeline().add({
								targets: header[0],
								translateY: '-105%',
								duration: 300
							}).add({
								targets: header[0],
								translateY: '0',
								duration: 0,
								offset: 400
							});
							setTimeout(function(){
								headerAnimDone = false;
								header.removeClass('_fixed');
							},400);
						}
					}
				}
			});
		}
	}

	////responsive

	//nav hambs
	$('.header__hamb').click(function(e){
		if(!mb){
			e.preventDefault();
			var el = $(this),
				cX = e.pageX,
				cY = e.pageY,
				path = $('#nav_circle circle');
			path.attr('cx',cX);
			path.attr('cy',cY);
			anime({
				targets: path[0],
				r: $(window).outerWidth()+$(window).outerHeight(),
				easing: 'easeInQuad',
				duration: 1200
			});
		}else{
			$('.header__nav').addClass('_active');
		}
	});
	$('.header__nav_close').click(function(e){
		if(!mb){
			var el = $(this),
				cX = e.pageX,
				cY = e.pageY,
				path = $('#nav_circle circle');
			path.attr('cx',cX);
			path.attr('cy',cY);
			anime({
				targets: path[0],
				r: 0,
				easing: 'easeOutQuint',
				duration: 1200
			});
		}else{
			$('.header__nav').removeClass('_active');
		}
	});
	//filter open
	if($('.s_cases__head').length){
		if(mb){
			$('.header__search_btn').after('<div class="s_cases__head_hamb"><span>Фильтр</span><svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 56.8 56.8"><path d="M56.6 4.4c-0.5-1.1-1.5-1.8-2.7-1.8H2.9c-1.2 0-2.2 0.7-2.7 1.8 -0.5 1.1-0.2 2.3 0.6 3.2l20.2 20.2V53c0 0.7 0.6 1.2 1.2 1.2 0.7 0 1.2-0.5 1.2-1.2V27.2c0-0.3-0.1-0.6-0.4-0.9L2.6 5.8c-0.2-0.2-0.1-0.4-0.1-0.5C2.5 5.2 2.6 5 2.9 5h51c0.3 0 0.4 0.2 0.4 0.3 0 0.1 0.1 0.3-0.1 0.5L33.7 26.4c-0.2 0.2-0.4 0.5-0.4 0.9v18.4c0 0.7 0.6 1.2 1.2 1.2 0.7 0 1.2-0.5 1.2-1.2V27.7l20.2-20.2C56.8 6.7 57 5.4 56.6 4.4z"/></svg></div>');
			headerHeight = $('.header').outerHeight();
			$('.header__temp').css({'height':headerHeight+'px'});
			$('.s_cases__head_filter').after('<div class="s_cases__head_close">&times;</div>');

			$('.s_cases__head_hamb').click(function(e){
				$('.s_cases__head').addClass('_active');
			});
			$('.s_cases__head_close').click(function(e){
				$('.s_cases__head').removeClass('_active');
			});
		}
	}
	if($('.s_catalog__head').length){
		if(mb){
			$('.header__search_btn').after('<div class="s_catalog__head_hamb"><span>Фильтр</span><svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 56.8 56.8"><path d="M56.6 4.4c-0.5-1.1-1.5-1.8-2.7-1.8H2.9c-1.2 0-2.2 0.7-2.7 1.8 -0.5 1.1-0.2 2.3 0.6 3.2l20.2 20.2V53c0 0.7 0.6 1.2 1.2 1.2 0.7 0 1.2-0.5 1.2-1.2V27.2c0-0.3-0.1-0.6-0.4-0.9L2.6 5.8c-0.2-0.2-0.1-0.4-0.1-0.5C2.5 5.2 2.6 5 2.9 5h51c0.3 0 0.4 0.2 0.4 0.3 0 0.1 0.1 0.3-0.1 0.5L33.7 26.4c-0.2 0.2-0.4 0.5-0.4 0.9v18.4c0 0.7 0.6 1.2 1.2 1.2 0.7 0 1.2-0.5 1.2-1.2V27.7l20.2-20.2C56.8 6.7 57 5.4 56.6 4.4z"/></svg></div>');
			headerHeight = $('.header').outerHeight();
			$('.header__temp').css({'height':headerHeight+'px'});
			$('.s_catalog__head_filter').after('<div class="s_catalog__head_close">&times;</div>');

			$('.s_catalog__head_hamb').click(function(e){
				$('.s_catalog__head').addClass('_active');
			});
			$('.s_catalog__head_close').click(function(e){
				$('.s_catalog__head').removeClass('_active');
			});
		}
	}

	//service line calculate
	if($('.s_service').length){
		var firstDot = $('.s_service__item').first()
				.find('.s_service__icon'),
			lastDot = $('.s_service__item').last()
				.find('.s_service__icon');
		$('.s_service__icon_line').css({
			'height':  lastDot.offset().top - firstDot.offset().top - 30 +'px'
		});
	}

	//sliders
	if($('.s_slider__slider').length){
		var sliderSwiper = new Swiper('.s_slider__slider_wrp',{
			slidesPerView: 1,
			autoHeight: true,
			speed: 1000,
			loop: true,
			parallax: true,
			effect: 'fade',
			auto: true,
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
		var solveSlider = new Swiper('.s_solve__slider_wrp',{
			spaceBetween: 60,
			slidesPerView: 1,
			loop: true,
			speed: 1350,
			autoplay: true,
			navigation: {
				nextEl: '.s_solve__arr_next',
				prevEl: '.s_solve__arr_prev',
			},
			breakpoints:{
				1000:{
					autoplay: false
				}
			}
		});
		if(!md){
			$(".s_solve").hover(function() {
				solveSlider.autoplay.stop();
			}, function() {
				solveSlider.autoplay.start();
			});
		}
		$('.s_solve__item').each(function(){
			var item = $(this),
				galleryTop = new Swiper(item.find('.s_solve__img'), {
					spaceBetween: 30,
					slidesPerView: 1,
					autoHeight: false,
					speed: 750,
					nested: true,
					breakpoints:{
						777:{
							spaceBetween: 10
						}
					}
				}),
				galleryThumbs = new Swiper(item.find('.s_solve__thumb'), {
					spaceBetween: 30,
					centeredSlides: true,
					slidesPerView: 3,
					touchRatio: 0.2,
					slideToClickedSlide: true,
					autoHeight: false,
					nested: true,
					breakpoints:{
						777:{
							spaceBetween: 10
						}
					}
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
			speed: 1000,
			autoplay: true,
			navigation: {
				nextEl: '.s_trust__arr_next',
				prevEl: '.s_trust__arr_prev',
			},
			breakpoints:{
				1000:{
					slidesPerView: 3,
					spaceBetween: 10
				},
				777:{
					slidesPerView: 2,
					spaceBetween: 10
				}
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
			},
			breakpoints:{
				1000:{
					slidesPerView: 3,
					spaceBetween: 10
				},
				777:{
					slidesPerView: 2,
					spaceBetween: 10
				}
			}
		});
	}
	if($('.s_catalog__row').length){
		var sovleSlider = new Swiper('.s_catalog__row',{
			spaceBetween: 30,
			slidesPerView: 3,
			loop: true,
			navigation: {
				nextEl: '.s_catalog__arr_next',
				prevEl: '.s_catalog__arr_prev',
			},
			breakpoints:{
				1000:{
					slidesPerView: 2,
					spaceBetween: 20
				},
				678:{
					slidesPerView: 1,
					spaceBetween: 10,
					autoHeight: true
				}
			}
		});
	}
	if($('.s_catalMain').length){
		var catalTop = new Swiper('.s_catalMain__img', {
				spaceBetween: 10,
				slidesPerView: 1,
				autoHeight: false,
				effect: 'flip'
			}),
			catalThumbs = new Swiper('.s_catalMain__thumb', {
				spaceBetween: 10,
				centeredSlides: true,
				slidesPerView: 5,
				touchRatio: 0.2,
				slideToClickedSlide: true,
				autoHeight: false,
				breakpoints:{
					555:{
						slidesPerView: 4
					},
					420:{
						slidesPerView: 3
					}
				}
			});
		catalTop.controller.control = catalThumbs;
		catalThumbs.controller.control = catalTop;
	}
	if($('.s_team').length){
		var teamHeadSlider = new Swiper('.s_team__head_slider',{
			slidesPerView: 'auto',
			spaceBetween: 50,
			navigation: {
				nextEl: '.s_team__head_arrNext',
				prevEl: '.s_team__head_arrPrev',
			},
			breakpoints:{
				777:{
					centeredSlides: true
				}
			}
		});
		var teamSlider = new Swiper('.s_team__slider_wrp',{
			slidesPerView: 6,
			spaceBetween: 30,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true
			},
			navigation: {
				nextEl: '.s_team__arr_next',
				prevEl: '.s_team__arr_prev',
			},
			observer: true,
			breakpoints:{
				1200:{
					slidesPerView: 5,
					spaceBetween: 20
				},
				920:{
					slidesPerView: 4,
					spaceBetween: 10
				},
				730:{
					slidesPerView: 3,
					spaceBetween: 10
				},
				555:{
					slidesPerView: 2,
					spaceBetween: 10
				},
				380:{
					slidesPerView: 1,
					spaceBetween: 10
				}
			}
		});

		$('.s_team__head a').click(function(){
			var a = $(this),
				filter = a.data('filter');
			a.addClass('_current').siblings().removeClass('_current');
			if(filter=="*"){
				$('.s_team__item').removeClass('_hidden').addClass('swiper-slide');
			}else{
				$('.s_team__item._'+filter).removeClass('_hidden').addClass('swiper-slide');
				$('.s_team__item:not(._'+filter+')').addClass('_hidden').removeClass('swiper-slide');
			}
		});
	}
	if($('.s_mount').length){
		var initSlide = $('.s_mount__item').length/2;
		var timeSlider = new Swiper('.s_mount__slider_wrp',{
			slidesPerView: 3,
			initialSlide: initSlide,
			centeredSlides: true,
			parallax: true,
			speed: 1000,
			navigation: {
				nextEl: '.s_mount__arr_next',
				prevEl: '.s_mount__arr_prev',
			},
			on:{
				slideChange: function(){
					var n = this.realIndex;
					$('.s_mount__head a').eq(n).addClass('_current').siblings().removeClass('_current');
				}
			},
			breakpoints:{
				555:{
					slidesPerView: 1
				}
			}
		});
		$('.s_mount__head a').click(function(){
			timeSlider.slideTo($(this).index());
		});
	}
	if($('.s_time').length){
		var timeSlider = new Swiper('.s_time__slider_wrp',{
			slidesPerView:'auto',
			spaceBetween: 30,
			direction: 'vertical',
			navigation: {
				nextEl: '.s_time__arr_next',
				prevEl: '.s_time__arr_prev',
			},
			slidesOffsetAfter: 150,
			on:{
				slideChange: function(){
					var n = this.realIndex;
					$('.s_time__pager a').eq(n).addClass('_current').siblings().removeClass('_current');
				}
			},
			breakpoints:{
				777:{
					slidesOffsetAfter: 250
				}
			}
		});
		$('.s_time__pager a').click(function(){
			timeSlider.slideTo($(this).index());
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

	//tabs
	if($('.g_tabs').length){
		$('.g_tabs').each(function(el){
			var el = $(this);
			var tabsSlider = new Swiper(el,{
				spaceBetween: 70,
				slidesPerView: 1,
				autoHeight: true,
				effect: 'fade',
				fadeEffect:{
					crossFade: true
				},
				shortSwipes: false,
				speed: 1000,
				on:{
					slideChange: function(){
						var n = this.realIndex;
						el.find('.g_tabs__head a').eq(n).addClass('_current').siblings().removeClass('_current');
					}
				}
			});
			el.find('.g_tabs__head a').click(function(e){
				e.preventDefault();
				tabsSlider.slideTo($(this).index());
			});
		});

	}

	//design colors screen
	if($('.s_color').length){
		//filter
		var sliderTabs = document.querySelector('.s_color__tabs').swiper;
		$('.s_color__left_head a').click(function(e){
			e.preventDefault();
			var btn = $(this),
				link = btn.data('link'),
				name = btn.data('name');

			$('.s_color__right_name').html(name);
			$('.s_color__right_btns .g_link').attr('href',link);
			  btn.addClass('_current').siblings().removeClass('_current');
			$('.s_color__item_wrp._active').removeClass('_active')
				.siblings().addClass('_active');
		});
		sliderTabs.on('slideChange',function(){
			$('.s_color__left_head.swiper-slide-active a').first().addClass('_current').siblings().removeClass('_current');
		});
		//color change
		$('.s_color__right_colors1 a').click(function(e){
			e.preventDefault();
			var color = $(this).data('color'),
				svg1 = $('.s_color__item_wrp._active #svgmask');
			anime.remove(svg1[0]);
			anime({
				targets: svg1[0],
				fill: color,
				duration: 700
			})
		});
		$('.s_color__right_colors2 a').click(function(e){
			e.preventDefault();
			var color = $(this).data('color'),
				svg2 = $('.s_color__item_wrp._active #svgmask2');
			anime.remove(svg2[0]);
			anime({
				targets: svg2[0],
				fill: color,
				duration: 700
			})
		});

	}

	//popups
	$('._open_pop').click(function(e){
		e.preventDefault();
		var visible = $('.popup._visible');
		visible.addClass('_back');
		setTimeout(function(){
			visible.removeClass('_visible _back');
		},450);
		var name = $(this).data('name'),
			txt = $(this).data('txt'),
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});
		popup.find('form').trigger( 'reset' );
		if(txt){
			popup.find('h2').html(txt);
		}
		if ($("body").height() > $(window).height() && !popup.hasClass('_absolute')){
			disableScroll(scrollContent);
		}
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
	});
	$('.overlay, ._close_pop').click(function(e){
		e.preventDefault();
		$('.popup._visible').addClass('_back');
		$('.overlay').removeClass('_visible');
		setTimeout(function(){
			$('.popup._visible').removeClass('_visible _back');
			enableScroll(scrollContent);
		},450);
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
						}, 3200);
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
		if(!mb){
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
		}else{
			$('.header__search').addClass('_active');
		}
	});
	$('.header__search_close').click(function(e){
		if(!mb){
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
		}else{
			$('.header__search').removeClass('_active');
		}
	});

	////gallery
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

	//video
	$('.s_should__video').click(function(){
		var img = $(this),
			wrp = img.closest('.s_should__right'),
			frame = wrp.find('iframe'),
			src = frame.attr('src');
		frame.attr('src',src + '?autoplay=1');
		wrp.addClass('_active');
	});
	$('.s_reviews__item_img').click(function(e){
		e.preventDefault();
		var img = $(this),
			wrp = img.closest('.s_reviews__item_imgWrap'),
			frame = wrp.find('iframe'),
			src = frame.attr('src');
		frame.attr('src',src + '?autoplay=1');
		wrp.addClass('_active');
	});

	//map
	//contacts.html
	if($('.s_map').length){
		mapInitialize('s_map');
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
		var gBtnTimeline = anime.timeline();
		gBtnTimeline.add({
			targets: path,
			d: 'M 12 6.25 C 54.67 3.67 54.67 3.67 110 3.67 C 172.25 3.67 207 6.25 207 6.25 C 210.866 6.25 214 9.384 214 13.25 L 214 26.75 C 213.91 31.75 214 35 214 41.25 C 214 45.116 210.866 48.25 207 48.25 C 173.83 51.83 173.83 51.83 110 51.83 C 39.17 51.83 12 48.25 12 48.25 C 8.134 48.25 5 45.116 5 41.25 C 5 29.33 5.05 31.79 5 26.83 C 5 22.303 5 17.777 5 13.25 C 5 9.384 8.134 6.25 12 6.25 Z',
			duration: 300
		}).add({
			targets: path,
			d: 'M 12 6.25 C 44.5 6.25 77 6.25 109.5 6.25 C 142 6.25 174.5 6.25 207 6.25 C 210.866 6.25 214 9.384 214 13.25 L 214 27.25 C 213.91 32.25 213.91 32.25 214 41.25 C 214 45.116 210.866 48.25 207 48.25 C 174.5 48.25 142 48.25 109.5 48.25 C 77 48.25 44.5 48.25 12 48.25 C 8.134 48.25 5 45.116 5 41.25 C 5 35 5.05 31.71 5 26.75 C 4.95 21.79 5 18.25 5 13.25 C 5 9.384 8.134 6.25 12 6.25 Z',
			duration: 2850,
			elasticity: 821,
			offset: '-=150'
		}).add({
			targets: span,
			scale: 1.07,
			duration: 200,
			offset: 0
		}).add({
			targets: span,
			scale: 1,
			duration: 500,
			offset: 145
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
		var gLinkTimeline = anime.timeline();
		gLinkTimeline.add({
			targets: path,
			d: 'M 0 7.5 C 12.16 15.61 12.16 15.61 54.5 7.5 C 101.5 -1.5 101.5 12.5 151.5 11.5 C 203.5 10.5 211.27 -0.26 247.5 7.5 C 264.818 11.066 282.682 11.066 300 7.5',
			duration: 350
		}).add({
			targets: path,
			d: 'M 0 7.5 C 25 7.5 50 7.5 75 7.5 C 100 7.5 125 7.5 150 7.5 C 175 7.5 200 7.5 225 7.5 C 250 7.5 275 7.5 300 7.5',
			duration: 2811,
			elasticity: 879,
			offset: '-=150'
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
		$(scrollContent).scroll(function(e){
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

//gmap init
function mapInitialize(el_id) {
	var center = $('#'+el_id).data('center').split(',');
	var kz = new google.maps.LatLng(center[0],center[1]);
	var mapOptions = {
		zoom: 18,
		center: kz,
		mapTypeControl: false,
		scrollwheel: false,
		navigationControl: false,
		scaleControl: false
	};
	var mapElement = document.getElementById(el_id);
	var map = new google.maps.Map(mapElement, mapOptions);


	var points = $('#'+el_id).data('points').split(';');
	points.forEach(function(feature) {
		var dot_info = feature.split('['),
			dot = dot_info[0].split(','),
			content = dot_info[1];
		var marker = new google.maps.Marker({
			position: {
				lat: Number(dot[0]),
				lng: Number(dot[1])
			},
			icon: '../images/ico/pin.png',
			map: map,
			title: "Мы находимся тут!",
			optimized: false
		});
		var infowindow = new google.maps.InfoWindow({
			content: content
		});
		marker.addListener('click', function () {
			infowindow.open(map, marker);
		});
	});
}

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
function getBrowser() {
	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if(/trident/i.test(M[1])){
		tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
		return {name:'IE',version:(tem[1]||'')};
	}
	if(M[1]==='Chrome'){
		tem=ua.match(/\bOPR|Edge\/(\d+)/)
		if(tem!=null)   {return {name:'Opera', version:tem[1]};}
	}
	M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	return {
		name: M[0],
		version: M[1]
	};
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


//scroll
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll(elem) {
	elem.prevAll('.simplebar-track').css({'opacity':0});
	if (elem.addEventListener) // older FF
		elem.addEventListener('DOMMouseScroll', preventDefault, false);
	elem.onwheel = preventDefault; // modern standard
	elem.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	elem.ontouchmove  = preventDefault; // mobile
	document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll(elem) {
	elem.prevAll('.simplebar-track').css({'opacity':1});
	if (elem.removeEventListener)
		elem.removeEventListener('DOMMouseScroll', preventDefault, false);
	elem.onmousewheel = document.onmousewheel = null;
	elem.onwheel = null;
	elem.ontouchmove = null;
	document.onkeydown = null;
}

function yourFunction(){
	setTimeout(function(){
		$('body,html').addClass('active');
		preloadAnimation.pause();
		anime({
			targets: '.fancy-bulb',
			translateY: [0,-150],
			rotate: [-180,-180],
			duration: 1500,
			delay: 1200
		});
		setTimeout(function(){
			$('.header__logo i').css({'width':'95px'});
			enableScroll(scrollContent);
			//logo E letter animation
			var headerLogoImg = $('.header__logo span img').last();
			anime({
				targets: headerLogoImg[0],
				opacity: [
					{value: 0, delay: function(){return anime.random(100,8500)}},
					{value: 1},
					{value: 0, delay: 130},
					{value: 1, delay: 619},
					{value: 0, delay:28},
					{value: 1, delay: function(){return anime.random(100,600)}},
					{value: 0, delay:200},
					{value: 1}
				],
				duration: 10,
				loop: true,
				delay: function(el, i, l) {
					return anime.random(0,7000);
				}
			});
		},1500);
		setTimeout(function(){
			$('.g_preloader, .header__logo i').remove();
		},2300);
	},1500);
}

window.addEventListener ?
	window.addEventListener("load",yourFunction,false)
:
window.attachEvent && window.attachEvent("onload",yourFunction);
