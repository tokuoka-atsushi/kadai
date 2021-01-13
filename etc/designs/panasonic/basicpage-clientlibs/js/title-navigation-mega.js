
;(function($){ 'use strict';
	$.fn.titleNavigationMega = function(){
		$.each(this, function(){
			var _this = this;
			var nav_main = $(_this).find('.nav-main');
			var nav_mega = $(_this).find('.nav-mega');
			var _li = $(nav_main).find('.root-item');
			//setup
			if(!_li.length){
				$(this).find('.local-mega-navigation').remove();
				$(this).find('.local-mega-navigation-mobile').remove();
			}
			//setup wai-aria
			$(nav_main).find('.root-item').each(function(index, element) {
				if($(this).has('.children').length){
					$(this).find('.titlenavelement a').attr('aria-expanded','false');
					$(this).find('.children').attr('aria-hidden','true');
				}
			});
			// setup for mobile
			var nav_mobile = $(_this).find('.local-mega-navigation-mobile');
			nav_mobile.html('<div class="nav_mobile" aria-hidden="true">'+nav_main.html()+'</div>');
			var nav_mobile_stay = nav_mobile.find('.stay-current');
			nav_mobile.prepend('<div class="nav-mobile-bar"><span class="name"></span><a href="#" class="toggle_button" aria-expanded="false"><span><img src="/etc/designs/panasonic/common-clientlibs/images/img-arrow-white-down-m.png" alt="'+$(_this).data('open-alt')+'"></span></a></div>');
			if(nav_mobile_stay.length){
				var nav_mobile_stay_name = '';
				nav_mobile_stay.each(function(index, element) {
					if($(this).parent().hasClass('root-item')){
						nav_mobile_stay_name = $(this).text();
					} else {
						nav_mobile_stay_name = $(this).closest('.root-item').children(':first-child').text();
					}
				});
				nav_mobile.find('.nav-mobile-bar .name').prepend(nav_mobile_stay_name);
			} else {
				//nav_mobile.prepend('<div class="nav-mobile-bar"><span class="name"></span><a href="#" class="toggle_button"><span></span></a></div>');
			}
			nav_mobile.find('.navlist li').each(function(index, element) {
				$(this).find('.link-megamenu').addClass('hasChildren');
				if($(this).closest('children') && $(this).find('ul').length){
					$(this).children('a, .nolink').addClass('hasChildren').attr('aria-expanded','false');
					$(this).find('ul').attr('aria-hidden','true');
				}
			});
			// setup for pc
			$(nav_main).find('.root-item').each(function(index, element) {
				//megamenu
				var nav_mega_obj = 
					$('<div class="nav-mega-wrapper">'+
						'<section class="nav-mega">'+
						'<div class="nav-mega-in">'+
							'<div class="nav-mega-header">'+
								'<div class="btn-close"><a href="#"><img src="'+$(_this).data('close-img')+'" alt="'+$(_this).data('close-alt')+'"/></a></div>'+
							'</div>'+
							'<div class="nav"></div>'+
						'</div>'+
					'</section>'+
					'</div>');
				if($(this).has('.children').length && $(this).has('.link-megamenu').length){
					nav_mega_obj.find('.nav').html($(this).find('.children').html());
					$(this).find('.children').html(nav_mega_obj);
				}
			});
			
			// for pc
			//action
			$(nav_main).find('.root-item').each(function(index, element) {
				$(this).find('a.link-megamenu').on({
					'click' : function(e){
						e.preventDefault();
						var $this = $(this);
						if(!$(this).hasClass('active')){
							if(_li.find('a').filter('.active').length){
								megaClose(_li.find('a').filter('.active'), function(){megaOpen($this);});
							} else {
								megaOpen($this);
							}
						} else {
							megaClose($this);
						}
					},
					keydown : function(e){
						if($(this).hasClass('active') && e.keyCode == 9 && e.shiftKey == true){
							megaClose($(this));
						}
					}
				});
			});
			function megaOpen(_elm, _callback){
				$(_elm).addClass('active').attr('aria-expanded','true');
				var $children = $(_elm).closest('.root-item').find('.children');
				var $wrapper = $(_elm).closest('.root-item').find('.nav-mega-wrapper');
				var $navmega = $wrapper.find('.nav-mega');
				$children.attr('aria-hidden','false');
				$navmega.css('visibility','visible');
				$wrapper.height($navmega.outerHeight());
				$navmega.find(':focusable').last().addClass('focusEnd');
				if(typeof _callback !== 'function'){
					_callback = function(){};
				}
				if(Modernizr.csstransitions){
					$wrapper.one('transitionend', function(){
						$navmega.find(':focusable').first().focus();
						_callback();
					});
				} else {
					$navmega.find(':focusable').first().focus();
					_callback();
				}
			}
			function megaClose(_elm, _callback){
				$(_elm).removeClass('active').attr('aria-expanded','false');
				var $children = $(_elm).closest('.root-item').find('.children');
				var $wrapper = $(_elm).closest('.root-item').find('.nav-mega-wrapper');
				var $navmega = $wrapper.find('.nav-mega');
				$wrapper.css('height','');
				if(typeof _callback !== 'function'){
					_callback = function(){};
				}
				if(Modernizr.csstransitions){
					$wrapper.one('transitionend', function(){
						$children.attr('aria-hidden','true');
						$navmega.css('visibility','');
						_callback();
					});
				} else {
					$children.attr('aria-hidden','true');
					$navmega.css('visibility','');
					_callback();
				}
			}
			$(nav_main).on('click', '.btn-close a', function(e){
				if($('html').hasClass('pressTabkey')){
					$(nav_main).find('.root-item').find('a.active').focus();
				}
				megaClose(_li.find('a').filter('.active'));
				e.preventDefault();
			});
			
			$(nav_main).on('keydown', '.focusEnd', function(e){
				if(e.keyCode === 9 && e.shiftKey === false){
					megaClose(_li.find('a').filter('.active'));
				}
			});
			
			// for mobile
			//action
			nav_mobile.find('.nav-mobile-bar').on({
				'click' : function(e){
					e.preventDefault();
					var _nav = nav_mobile.find('.nav_mobile');
					var _navbar = $(this);
					if(_navbar.hasClass('active')){
						_nav.slideUp(500).attr('aria-hidden','true');
						_navbar.removeClass('active').find('a').attr('aria-expanded','false').find('img').attr('alt',$(_this).data('open-alt'));
					} else {
						_nav.slideDown(500).attr('aria-hidden','false');
						_navbar.addClass('active').find('a').attr('aria-expanded','true').find('img').attr('alt',$(_this).data('close-alt'));
					}
				}
			});
			nav_mobile.find('.hasChildren').each(function(index, element){
				var _child;
				if($(this).hasClass('link-megamenu')){
					_child = $(this).closest('.root-item').find('.children');
				} else {
					_child = $(this).next();
				}
				if(typeof _child === 'object'){
					if(_child.has('.stay-current').length){
						$(this).addClass('active').attr('aria-expanded','true');
						_child.attr('aria-hidden','false');
					} else {
						_child.hide();
					}
				}
 				$(this).on({
					click : function(e){
						e.preventDefault();
						if($(this).hasClass('active')){
							_child.slideUp(300).attr('aria-hidden','true');
							$(this).removeClass('active').attr('aria-expanded','false');
						} else {
							_child.slideDown(300).attr('aria-hidden','false');
							$(this).addClass('active').attr('aria-expanded','true');
						}
					}
				});
			});
		});
	};
	$(function(){
		$('.titlenavigation .typemegamenu').titleNavigationMega();
	});
})(jQuery);
