$(document).ready(function () {

	/*** Tabs and anchors ***/
	$(document).on('click', 'a.js-anchor[href*="#"], a.tabs__link[href*="#"], a.nav__sub-link[href*="#"], a.footer__link[href*="#"]', anchor);

	function anchorHash(hash,id) {
		var $tabs = id.closest('.tabs');
		var $tabsItem = $('.tabs__link[href="' + hash + '"]').closest('.tabs__item');

		if ( $tabs.length && $tabs.children(id) ) {
			// scroll to tab and open it
			$("html, body").animate({
				scrollTop: $tabs.offset().top - 15
			}, 600);

			$tabs.find('.tabs__item_active')
					.removeClass('tabs__item_active');
			$tabsItem.addClass('tabs__item_active');
			$tabs.find('.tabs__section').hide();
			id.fadeIn(300);

			var noHashURL = window.location.href.replace(/#.*$/, '');
			window.history.replaceState('', document.title, noHashURL);
		}
		else {
			// scroll to .js-anchor element
			$("html, body").animate({
				scrollTop: id.offset().top - 28
			}, 600);
		}
	}

	function anchor(e) {
		var hash = $(this).attr('href').substring($(this).attr('href').indexOf('#'));
		var id = $(hash);

		if ( hash !== '' && id.length ) {
			e.preventDefault();

			anchorHash(hash,id);
		}
	}

	// scroll to element when page is loaded
	var hash = window.location.hash;
	var id = $(hash);

	if ( hash !== '' && id.length ) {
		anchorHash(hash,id);
	}


	/*** Filters and sorting ***/
	$(document).on('click', '.filter__btn', filterToggle);
	$(document).on('click', '.filter__close', filterClose);
	$(document).on('click', '.filter_sort .radio__label', filterSort);
	$(document).on('click', '.filter_check .filter__submit', filterSubmit);
	$(document).on('click', '.js-filter__reset', filterReset);

	$(document).click(function (e) {
		var $filter = $('.filter');
		var $dropdown = $filter.find('.filter__dropdown');
		var $btn = $filter.find('.filter__btn, .filter__text');

		if ( $filter.hasClass('filter_opened') && !$btn.is(e.target) && !$dropdown.is(e.target) && $dropdown.has(e.target).length === 0 ) {
			$filter.removeClass('filter_opened');
		};
	});

	function filterToggle(e) {
		e.preventDefault();

		var $filter = $(this).closest('.filter');

		if ($filter.hasClass('filter_opened')) {
			$filter.removeClass('filter_opened');
		}
		else {
			$filter.addClass('filter_opened');
		}
	}

	function filterClose(e) {
		e.preventDefault();

		$(this).closest('.filter').removeClass('filter_opened');
	}

	// sort
	function filterSort() {
		var $clicked = $(this);
		var $filter = $(this).closest('.filter');
		var $caption = $filter.find('.filter__text');
		var text = $(this).text();

		$caption.text(text);

		var $container = $('.js-filter_sort');
		var $items = $('.js-filter_sort .js-filter__item');
		var sortItems = $.makeArray($items);

		if ( $clicked.attr('for') == 'price-hl' ) {
			sortItems.sort(function(a, b) {
				return $(b).data("price") - $(a).data("price");
			});
		}
		else if ( $clicked.attr('for') == 'price-lh' ) {
			sortItems.sort(function(a, b) {
				return $(a).data("price") - $(b).data("price");
			});
		}
		else if ( $clicked.attr('for') == 'distance-closest' ) {
			sortItems.sort(function(a, b) {
				return $(a).data("distance") - $(b).data("distance");
			});
		}
		else if ( $clicked.attr('for') == 'distance-farthest' ) {
			sortItems.sort(function(a, b) {
				return $(b).data("distance") - $(a).data("distance");
			});
		}

		$(sortItems).appendTo($container);

		filterLoading($filter,$container);
	}

	// filter
	function filterSubmit(e) {
		e.preventDefault();

		var $filter = $(this).closest('.filter');
		var $checkbox = $filter.find('.checkbox__input:checked');

		var $container = $('.js-filter');
		var $filterItem = $('.js-filter__item');

		var options = [];
		$.each($checkbox, function(){
			options.push($(this).val());
		});

		$.each($filterItem, function(){
			var item = $(this);
			var dataArr = $(this).data('options').split(', ');

			item.show();
			item.css('background','');
			compareStrings(item, dataArr, options);
		});

		// counter
		count = $filterItem.not(':hidden').length;
		$('.filter__result-value').text(count);

		if (count == 0) {
			$('.js-filter__reset').show();
		}
		else {
			$('.js-filter__reset').hide();
		}

		filterLoading($filter,$container);
	}

	function compareStrings(item, needle, haystack) {
		var compare = $(haystack).not(needle).get().length;
		if (compare == 0) {
		}
		else if (compare == needle.length) {
			item.hide();
		}
		else {
			item.hide();
		}
	}

	// reset filter
	function filterReset(e) {
		e.preventDefault();

		var $filter = $('.filter');
		var $value = $filter.find('.filter__result-value');
		var $checkbox = $filter.find('.checkbox__input:checked');
		var $container = $(this).closest('.js-filter');
		var $item = $container.find('.js-filter__item');

		$item.show();
		$value.text($item.length);
		$checkbox.prop('checked', false);

		$('.js-filter__reset').hide();

		filterLoading($filter,$container);
	}

	// filter loading
	function filterLoading(filter,container) {

		filter.removeClass('filter_opened');

		// scroll to top of block
		$("html, body").animate({
			scrollTop: filter.offset().top - 25
		}, 450);

		// add loading background
		container.addClass('js-filter_loading');
		setTimeout(function(){
			container.removeClass('js-filter_loading');
		},300);
	}


	/*** Mobile navigation open/close ***/
	$(document).on('click', '.nav__btn', navToggle);
	$(document).on('click', '.nav__item_dropdown .nav__link', subnavDropdown);
	$(window).resize(resetSubnavDropdown);

	function navToggle(e) {
		e.preventDefault();

		var $body = $('body');

		if ($body.hasClass('nav-opened')) {
			$body.removeClass('nav-opened');
		}
		else {
			$body.addClass('nav-opened');
		}
	}

	// open/close dropdown categories in main navigation (mobile)
	function subnavDropdown(e) {
		e.preventDefault();

		if ( $('body').width() < '993') {

			var $subnavContainer = $(this).closest('.nav__item');
			var $subnavContainerAll = $(this).closest('.nav__list').find('.nav__item');
			var $subnavDropdown = $subnavContainer.find('.nav__dropdown');
			var $subnavDropdownsAll = $(this).closest('.nav__list').find('.nav__dropdown');

			$subnavDropdownsAll.slideUp(300);
			$subnavContainerAll.removeClass('nav__item_opened');

			if ($subnavDropdown.is(":visible")) {
				$subnavDropdown.slideUp(300);
				$subnavContainer.removeClass('nav__item_opened');
			}
			else {
				$subnavDropdown.slideDown(300);
				$subnavContainer.addClass('nav__item_opened');
			}
		}
	}

	// reset styles and classes for dropdowns when we resize browser window
	function resetSubnavDropdown() {
		if ($('.nav__dropdown').length) {
			if ( $('body').width() > '992') {
				$('.nav__dropdown').css('display','');
				$('.nav__item').removeClass('nav__item_opened');
			}
		}
	}


  /*** Gallery ***/
  // Create popup
  if ($('.gallery').length) {
    var $gallery = $('.gallery');
    var $galleryBase = $gallery.find('.gallery__base');
    var $galleryItem = $gallery.find('.gallery__item');

		$galleryItem.clone().appendTo($galleryBase);
  }

  $(document).on('click', '.gallery__cover .gallery__item', galleryShow);
  $(document).on('click', '.gallery__close', galleryClose);

  function galleryShow(e) {
    e.preventDefault();

    $('body').addClass('gallery-opened');

    var $item = $(this);
    var $gallery = $item.closest('.gallery');
    var $galleryPopup = $gallery.find('.gallery__popup');

    var clickedSrc = $item.find('.gallery__img').attr('data-src');

    var $galleryBase = $gallery.find('.gallery__base');

    var $popupImg = $galleryBase.find('.gallery__img[data-src="' + clickedSrc + '"]');
    var $popupItem = $popupImg.closest('.gallery__item');

    $popupItem.clone().prependTo($galleryBase).addClass('gallery__item_current');
    $popupItem.hide();

    $gallery.addClass('gallery_opened');

    // scroll to top of popup
    $galleryPopup.scrollTop(0);
  }

  function galleryClose(e) {
    e.preventDefault();

    $('body').removeClass('gallery-opened');
    var $gallery = $(this).closest('.gallery');
    var $galleryBase = $gallery.find('.gallery__base');

    $gallery.removeClass('gallery_opened');

    setTimeout(function () {
      $galleryBase.find('.gallery__item:hidden').show();
      $galleryBase.find('.gallery__item_current').remove();
    },300);
  }


  /*** Sliders ***/
	// Slider Cover (first screen)
	if ($('.slider_cover').length) {
    var coverSlider = new Swiper('.slider_cover', {
      speed: 800,
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
	}

	// Slider Place
  if ($('.slider_place').length) {
    var placeSlider = new Swiper('.slider_place', {
      speed: 400,
			loop: true,
      longSwipesRatio: 0.2,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }

	// open slide link
	$(document).on('click', '.place .swiper-wrapper, .place__item_mob', function () {
		var link = $(this).closest('.place').find('.place__link').attr('href');
		window.open(link, '_blank'); // to open link in current window change _blank to _self
	});
	$(document).on('click', '.offer .swiper-wrapper, .offer__pic_mob', function () {
		var link = $(this).closest('.offer').find('.offer__href').attr('href');
		window.open(link, '_blank'); // to open link in current window change _blank to _self
	});

	// Slider Stay
  if ($('.slider_stay').length) {
    var staySlider = new Swiper('.slider_stay', {
      speed: 400,
      slidesPerView: 'auto',
      longSwipesRatio: 0.25,
    });
  }

  // Slider Property
  if ($('.slider_property').length) {
    var propertySlider = new Swiper('.slider_property', {
      speed: 400,
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 10,
      longSwipesRatio: 0.2,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        577: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 6,
          slidesPerGroup: 6,
          spaceBetween: 12,
        },
        993: {
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 14,
        }
      }
    });
	}

	// Slider Offer
  if ($('.slider_offer').length) {
    var offerSlider = new Swiper('.slider_offer', {
      speed: 400,
      loop: true,
      longSwipesRatio: 0.2,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }


  /*** vh fix for mobile ***/
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	/*** Expand/collapse ***/
	if ($('.expand').length) {

		function expandDetect() {
			$('.expand').each(function() {
				var $expand = $(this);
				var $expandWrapper = $expand.find('.expand__wrapper');
				var expandHeight = $expand.find('.expand__container').outerHeight();
				var heightSmall = 280;
				var heightDefault = 196;
				var heightBig = 368;

				if ($expand.hasClass('expand_small') && expandHeight > heightSmall) {
					$expand.addClass('expand_active');

					if ($expand.hasClass('expand_opened')) {
						$expandWrapper.height(expandHeight);
					}
					else {
						$expandWrapper.height(heightSmall);
					}
				}
				else if ($expand.hasClass('expand_default') && expandHeight > heightDefault) {
					$expand.addClass('expand_active');

					if ($expand.hasClass('expand_opened')) {
						$expandWrapper.height(expandHeight);
					}
					else {
						$expandWrapper.height(heightDefault);
					}
				}
				else if ($expand.hasClass('expand_big') && expandHeight > heightBig) {
					$expand.addClass('expand_active');

					if ($expand.hasClass('expand_opened')) {
						$expandWrapper.height(expandHeight);
					}
					else {
						$expandWrapper.height(heightBig);
					}
				}
				else {
					$expand.removeClass('expand_active');
					$expandWrapper.removeAttr('style');
				}
			});
		}
		expandDetect();
		$(window).resize(expandDetect);
	}
	$(document).on('click', '.expand__box', expandToggle);

	function expandToggle(e) {
		e.preventDefault();

		var $expand = $(this).closest('.expand');
		var $expandWrapper = $expand.find('.expand__wrapper');
		var $expandContainer = $expand.find('.expand__container');
		var expandHeight = $expandContainer.outerHeight();

		if ($expand.hasClass('expand_opened')) {
			$expand.removeClass('expand_opened');
			$expandWrapper.removeAttr('style');

			// scroll to top of element
			$("html, body").animate({
				scrollTop: $expand.offset().top - 15
			}, 800);
		}
		else {
			$expand.addClass('expand_opened');
			$expandWrapper.height(expandHeight);
		}
	}

	/*** Map ***/
	$(document).on('click', '.map__btn', mapShow);
	$(document).on('click', '.map__close', mapClose);

	function mapShow(e) {
		e.preventDefault();

		var $map = $(this).closest('.map');
		var $frame = $map.find('.map__frame[src=""]');

		$frame.each(function() {
			var data = $(this).attr('data-src');
			$(this).attr('src', data);
		});

		$map.addClass('map_opened');

		if ($(this).hasClass('map__btn_location')) {
			$map.addClass('map_location');
			$map.removeClass('map_distance');
		}
		else if ($(this).hasClass('map__btn_distance')){
			$map.addClass('map_distance');
			$map.removeClass('map_location');
		}
	}

	function mapClose(e) {
		e.preventDefault();

		$(this).closest('.map').removeClass('map_opened map_location map_distance');
	}

	var $map = $('.map-inner');

	if ($map.length) {
		$frame = $(this).find('.map-inner__frame');
		var data = $frame.attr('data-src');

		setTimeout(function () {
			$frame.attr('src', data);
		},2000);
	}


	/*** Cut text offer ***/
	var $cutOffer = $('.offer__desc');

	if ($cutOffer.length) {
		function cutText() {
			if ( $('body').width() < '993') {
				$cutOffer.ellipsis({
					lines: 2,
					ellipClass: 'ellip',
					responsive: true
				});
			}
			else {
				$cutOffer.ellipsis({
					lines: 4,
					ellipClass: 'ellip',
					responsive: true
				});
			}
		}
		cutText();
		$(window).resize(cutText);
	}


	/*** Zooming map ***/
	$(document).on('click', '.zoom-link', zoomShow);
	$(document).on('click', '.zoom__img', zoomScale);
	$(document).on('click', '.zoom__close', zoomClose);

	function zoomShow(e) {
		e.preventDefault();

		$('body').addClass('zoom-opened');
	}

	function zoomScale() {
		var $container = $(this).closest('.zoom');

		if ($container.hasClass('zoom_scaled')) {
			$container.removeClass('zoom_scaled');
		}
		else {
			$container.addClass('zoom_scaled');
		}
	}

	function zoomClose(e) {
		e.preventDefault();

		$('body').removeClass('zoom-opened');
		$('zoom').removeClass('zoom_scaled');

		var position = $('.zoom-link').offset().top;
		var offset = position - 10;

		$("html, body").scrollTop(offset);
	}

	// check for touch devices
	function is_touch() {
		return ( 'ontouchstart' in window ) ||
				( navigator.maxTouchPoints > 0 ) ||
				( navigator.msMaxTouchPoints > 0 );
	}

	var body = $('body');

	if( is_touch() ) {

		body.addClass('is-touch');

		if ($('.zoom').length) {
			// pinch zoom for touch devices
			new window.PinchZoom.default(document.querySelector('.zoom__wrap'), {
				tapZoomFactor: 3,
				draggableUnzoomed: false,
				verticalPadding: 20
			});
		}
	}
	else {
		body.addClass('is-no-touch');
	}

	/*** Forms validate and submit ***/

	/* Form Contact */
	$("#form-contact").submit(function(e) {
		var $form = $(this);

		if (this.checkValidity()) {
			$form.find('button[type=submit]').prop('disabled', true);
			var data = new FormData(this);
			$.ajax({
				url: '/form-contact.php',
				method: 'POST',
				data: data,
				contentType: false,
				processData: false,
				complete: function () {
					$form.find('button[type=submit]').prop('disabled', false);
				},
				success: function (data) {
					if (data != 'OK') {
						alert(data);
						return;
					}
					// success message
					$form.addClass('form_sended');

					// scroll to top of form
					var formY = $form.offset().top;
					var scrolled = $(window).scrollTop();

					if (scrolled > formY) {
						$("html, body").animate({
							scrollTop: formY - 15
						}, 600);
					}
				}
			});
		}
		e.preventDefault();
	});

	/* Form Submit Property */
	$("#form-submit-property").submit(function(e) {
		var $form = $(this);

		if (this.checkValidity()) {
			$form.find('button[type=submit]').prop('disabled', true);
			var data = new FormData(this);
			$.ajax({
				url: '/form-submit-property.php',
				method: 'POST',
				data: data,
				contentType: false,
				processData: false,
				complete: function () {
					$form.find('button[type=submit]').prop('disabled', false);
				},
				success: function (data) {
					if (data != 'OK') {
						alert(data);
						return;
					}
					// success message
					$form.addClass('form_sended');

					// scroll to top of form
					var formY = $form.offset().top;
					var scrolled = $(window).scrollTop();

					if (scrolled > formY) {
						$("html, body").animate({
							scrollTop: formY - 15
						}, 600);
					}
				}
			});
		}
		e.preventDefault();
	});
});