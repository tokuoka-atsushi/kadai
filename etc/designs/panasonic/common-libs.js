// add start scsk
var _gaq = _gaq || [];
// add end scsk
var browser = "";
(function(){
	if(!jQuery.support.opacity){
    	if(!jQuery.support.tbody){
			browser = "ie7or6";
		}else{
			browser = "ie8";
   		}
	}
});

/* BUILD VERSION 0.1.83 */
var addthis_config = addthis_config || {};
addthis_config.ui_offset_top = 0;
var isMobile;
/* for Cookie Policy */
var GwcCommon = {
	/* cookie-policy related utilities. */
	cookiePolicyOptIn: $.Deferred(),
	isCookieUsable: function(){return !window.CookiePolicy || cookieStatus == 0;},

	/*
	 * After logging in, viewing a non-authenticated pages to redirect to the authentication page path.
	 */
	authAreaForwardPath: '',
	/*
	 * Gets the forwardPath.
	 * GwcCommon.authAreaForwardPath(if specified) or own page path.
	 */
	getForwardPath: function() {
		return GwcCommon.authAreaForwardPath || document.location.pathname;
	},
	getSamlUrl: function(basePath) {
		var params = {relayState: document.location.pathname, d: document.domain};
		if (basePath.match(/\{0\}/)) {
			return basePath.replace(/\{0\}/, 'relay=' + encodeURIComponent('relayState='+params.relayState+'&d='+params.d));
		}
		return basePath + '?' + $.param(params);
	},
	replaceUrlForLogin: function(target) {
		$(target).prop('href', GwcCommon.getSamlUrl($.trim($('#sp_sso_login_url_eu').text()) || 'https://' + document.domain + '/servlet/saml/login'));
	},
	replaceUrlForLogout: function(target) {
		$(target).prop('href', GwcCommon.getSamlUrl($.trim($('#sp_sso_logout_url_eu').text()) || 'https://' + document.domain + '/servlet/saml/logout'));
	}
};

jQuery(function($){
	isMobile = function(){
		if($('#page').css('min-width')=='320px'){
			return true;
		}
		return false;
	}
	if((navigator.userAgent.indexOf("iPhone") != -1)||(navigator.userAgent.indexOf("Android") != -1)||(navigator.userAgent.indexOf('iPod')  !=-1)||(navigator.userAgent.indexOf('iPad')  !=-1)){
		$('html').addClass('touch-device');
	}
	$(document).keydown(function(e) {
		Code = e.keyCode || e.which;
		if(Code == 9){
			$('html').addClass('pressTabkey');
			//$('a:focus, area:focus, input:focus, select:focus, textarea:focus, button:focus, iframe:focus, object:focus, embed:focus').css('outline','dotted 1px invert');
		}
	});
	var placeholder = {
		init: function(formId, attrs){
			if(attrs.length > 0 && attrs!=undefined && $('#'+formId).is('form')){
				if($('#'+formId).find('label').length){
					placeholder.addValues(formId, attrs);
					placeholder.focus(formId, attrs);
					placeholder.blur(formId, attrs);
					placeholder.submit(formId, attrs);
				} else {
					placeholder.submit2(formId, attrs);
				}
			}
		},
		addValues: function(formId, attrs){
			$('#'+formId).addClass('no-submitform');
			for(var x=0; x<attrs.length; x++ ){
				var input = $('#'+formId+' '+'#'+attrs[x].id);
				input.attr('value',attrs[x].value);
				input.addClass('placeholder');
				input.addClass('no-submit');
			}
		},
		focus: function(formId, attrs){
			$('#'+formId+' '+'.'+'placeholder').focus(function(){
				var target = $(this);
				for(var x=0; x<attrs.length; x++ ){
					if(target.attr('id')==attrs[x].id && target.val()==attrs[x].value){
						target.val('');
						target.removeClass('no-submit');
						target.parent().removeClass('no-submitform');
						break;
					}else if(target.attr('id')==attrs[x].id && target.val()!=attrs[x].value &&  target.val()!=''){
						target.removeClass('no-submit');
						target.parent().removeClass('no-submitform');
						break;
					}
				}
			});
		},
		blur: function(formId, attrs){
			$('#'+formId+' '+'.'+'placeholder').blur(function(){
				var target = $(this);
				for(var x=0; x<attrs.length; x++ ){
					if(target.attr('id')==attrs[x].id && target.val()===""){
						//target.attr('value', attrs[x].value);
						target.addClass('no-submit');
						target.parent().addClass('no-submitform');
						target.val(attrs[x].value);
						break;
					}
					else{
						target.removeClass('no-submit');
						target.parent().removeClass('no-submitform');
					}
				} 
			});
		},
		submit: function(formId, attrs){
			var form, valid;
			form = $('#'+formId);
			form.submit(function(){
				var target = $(this).find('.placeholder');
				if(form.children().hasClass('no-submit') || target.val()==""){
					return false;
				}
					return true;
			});
		},
		submit2: function(formId, attrs){
			var form, valid;
			form = $('#'+formId);
			form.on('submit', function(e){
				vaild = true;
				$(attrs).each(function(index, element) {
					if($('#'+element.id).val()===''){
						vaild = false;
						return false;
					}
				});
				if(!vaild){
					e.preventDefault();
				}
			});
		}
	};

	var blurTxt = $('#searchformhead label').text();
	placeholder.init('searchformhead',
	[{
		id:'s',
		value: blurTxt
	}]
	);
	var searchFormPlaceholderValue = $('#searchPageForm #sp').val();
	placeholder.init('searchPageForm',
			[{
			  id:'sp',
			  value:searchFormPlaceholderValue
			}]
	);
	
	/* for Async image load at header panel */
	if (!isMobile() && $.isFunction($.fn.imageConverter)) {
		// Global Nav
		$('#globalheader-nav.accesible .main-nav-root:has(.megapannel)').each(function() {
			var $mainNavRoot = $(this);
			$('.main-nav-root__title a', $mainNavRoot).click(function() {
				$('.parrays > ul > li > .parbase .img-element img[data-type="delay-load"]', $mainNavRoot).filter(function() {
					return !$(this).data('ic-state');
				}).imageConverter();
			});
			// Header Panel
			$('ul > li > .parbase', $mainNavRoot).each(function() {
				var $parbase = $(this);
				var $targetImg = $parbase.next('ul').find('> li > .parbase .img-element img[data-type="delay-load"]');
				if ($targetImg.length > 0) {
					$('a', $parbase).click(function() {
						$targetImg.filter(function() {
							return !$(this).data('ic-state');
						}).imageConverter();
					});
				}
			});
		});

	}

	// Function to initialize the header panel navigation
	var initializeHeaderPanelNavigation = function() {
		var navmenucats = $('#navmenucats');
		var inbread = navmenucats.find('.inbread');
		var product_text = $.trim($(".link-products").text());
		$('.inbread').html('<span>' + product_text + '</span>');
		var active_child;
		var bread = function(){
			inbread.find('a').on({'click': function(){
				var title = $(this).attr('title');
				var text = $(this).text();
				var nextAll = $(this).parent().nextAll().addClass('next');
				var indexNum = $(this).parent().index();
				active_child.children('li').children('.parbase').fadeOut('fast',function(){
					if(indexNum <= 0){
						navmenucats.find('.parrays > ul > li > .parbase').fadeIn();
					}else{
						active_child.parent().parent('ul').children('li').children('.parbase').fadeIn(function(){
							active_child = $(this).parent().parent();
						});
					}
				});
				nextAll.remove();
				$(this).parent().html(text)
				return false;
			}});
		}
		navmenucats.find('.parbase > a').on({'click': function(){
			var href = $(this).attr('href');
			var child = $(this).parent('div').next('ul');
			if (child.length) {
				var active_cat = $(this).attr("title");
				var hide_item = $(this).parent().parent('li').parent('ul').children('li').children('.parbase');
				inbread.find('span').each(function(index, element) {
					if(!$(this).find('a').length){
						var text = $(this).text();
						$(this).html('<a href="#'+$.trim(text)+'" title ="'+text+'">'+text+'</a>');
					}
				});
				inbread.append('<span class="subcat"> ' + active_cat + '</span>');
				hide_item.fadeOut('fast',function(){
					if (!$(this).is($(child).siblings('.parbase'))) {
						return;
					}
					child.children('li').children('.parbase').fadeIn({
						duration: 'fast',
						complete: function(){}
					});
				});
				active_child = child;
				bread();
				return false;
			} else {
				return true;
			}
		}});
	}
	initializeHeaderPanelNavigation();
	
	
	//megaPanelNavigation
	var initializeMegaPanelNavigation = function() {	
		$('#globalheader-nav').not('.accesible').find('.link-megaPanel').each(function(index, element) {
			var navmenucats = $('#' + $(this).attr('data-panelnav-id'));
			var _this = this;
			if(navmenucats.find('.parrays').children().hasClass('wrapper-noimage')){
				navmenucats.addClass('noimage');
			}
			// setup
			$(_this).attr('aria-controls',$(this).attr('data-panelnav-id')).attr('aria-expanded','false');	
			navmenucats.attr('aria-hidden','true');
			//click
			$(_this).on('click', function(e){
				if($(this).parent().hasClass('active')){
					$("#navmenucat .hide").slideUp('slow');
					navmenucats.attr('aria-hidden','true');
					$(_this).attr('aria-expanded','false').parent().removeClass("active");
				}else{
					if($("#navmenucat .hide").css('display')=='none'){
						navmenucats.show().attr('aria-hidden','false').siblings().hide();
						$("#navmenucat .hide").slideDown({
							duration : 'slow',
							complete : function(){
								settabindex(navmenucats);
								focusfirst(navmenucats);
							}
						});
						$(_this).attr('aria-expanded','true').parent().addClass("active");
					}else{
						$("#navmenucat .hide").slideUp('slow',function(){
							navmenucats.show().attr('aria-hidden','false').siblings().hide().attr('aria-hidden','true');
							$(_this).parent().siblings().removeClass('active').find('a').attr('aria-expanded','false');
							
							$("#navmenucat .hide").slideDown({
								duration : 'slow',
								complete : function(){
									settabindex(navmenucats);
									focusfirst(navmenucats);
								}
							});
							$(_this).attr('aria-expanded','true').parent().addClass("active");
						});
					}
				}
				e.preventDefault();
			});
			$(_this).on('keydown', function(e){
				if(e.keyCode === 9 && e.shiftKey === false && $(this).parent().hasClass('active')){
					e.preventDefault();
					navmenucats.find('.focusFirst').focus();
				}
			});
			navmenucats.find('.btn-slide').on('click', function(e){
				e.preventDefault();
				$("#navmenucat .hide").slideUp('slow');
				$('#globalheader-nav').find('.link-megaPanel').parent().removeClass('active');
				if($('html').hasClass('pressTabkey')){
					$(_this).focus();
				}
				navmenucats.attr('aria-hidden','true');
			});
			
			
			var inbread = navmenucats.find('.inbread');
			var root_text = $.trim($(this).text());
			inbread.html('<span tabindex="0">' + root_text + '</span>');
			var active_child;
			var bread = function(){
				inbread.find('a').on({
					'click': function(){
						var title = $(this).attr('title');
						var text = $(this).text();
						var nextAll = $(this).parent().nextAll().addClass('next');
						var indexNum = $(this).parent().index();
						var active_child_children_length = active_child.children('li,div.noimage-container').length;
						active_child.children('li,div.noimage-container').children('.parbase').each(function(index, val){
							$(this).fadeOut('fast',function(){
								active_child.removeAttr('style').attr('aria-hidden','true');
								active_child.prev('.parbase').find('a[aria-expanded=true]').attr('aria-expanded','false');
								if(indexNum <= 0){
									active_child.parent().parent('ul').removeAttr('style');
									navmenucats.find('.parrays > ul > li > .parbase').fadeIn({
										start : function(){
											active_child.closest('.megapannel').removeClass('noimage');
										},
										complete:function(){
											if(active_child_children_length-1 == index && $(this).parent().siblings().length == $(this).parent().index()){
												setHeight(navmenucats.find('.parrays > ul'));
											}
											settabindex(navmenucats);
										}
									});
								}else{
									active_child.parent().parent('ul').children('li').children('.parbase').fadeIn({
										start : function(){
											active_child.closest('.megapannel').removeClass('noimage');
										},
										complete : function(){
											active_child = $(this).parent().parent();
											settabindex(navmenucats);
										}
									});
								}
							});
						});
						
						nextAll.remove();
						$(this).parent().html(text);
						return false;
					}
				});
			}
			navmenucats.find('.parbase > a').each(function(index, element) {
				var href = $(this).attr('href');
				var child = $(this).parent('div').next('ul,div.wrapper-noimage');
				child.attr('aria-hidden','true');
				if (child.length) {
					$(this).attr('aria-expanded','false');
					var active_cat = $.trim($(this).text());
					var hide_item = $(this).parent().parent('li').parent('ul').children('li').children('.parbase');
					$(this).on('click', function(e){
						e.preventDefault();
						$(this).attr('aria-expanded','true');
						inbread.find('span').each(function(index, element) {
							if(!$(this).find('a').length){
								var text = $(this).text();
								$(this).html('<a href="#'+$.trim(text)+'" title ="'+text+'">'+text+'</a>');
							}
						});
						inbread.append('<span class="subcat" tabindex="0"> ' + active_cat + '</span>');
						if($('html').hasClass('pressTabkey')){
							inbread.find('span').last().focus();
						}
						child.show().attr('aria-hidden','false');
						hide_item.fadeOut('fast',function(){
							if (!$(this).is($(child).siblings('.parbase'))) {
								return;
							}
							child.children('li,div.noimage-container').children('.parbase').fadeIn({
								duration : 'fast',
								start : function(){
									setHeight(child);
								},
								complete : function(){
									settabindex(navmenucats);
								}
							});
						});
						active_child = child;
						bread();
					});
				}
			});
			navmenucats.on('keydown', '.focusEnd', function(e){
				var $next = $(_this).closest('li').next();
				if(e.keyCode === 9 && e.shiftKey === false) {
					if($next.length){
						e.preventDefault();
						$($next).find('a').focus();
					}
					$("#navmenucat .hide").slideUp('slow');
					$('#globalheader-nav').find('.link-megaPanel').parent().removeClass('active');
				}
			});
			navmenucats.on('keydown', '.focusFirst', function(e){
				if(e.keyCode === 9 && e.shiftKey === true){
					e.preventDefault();
					$(_this).focus();
				}
			});
			function setHeight(_elm){
				var parrays = $(_elm).closest('.parrays');
				var ph = parrays.height();
				var ch = $(_elm).height();
				parrays.stop().animate({height:ch+'px'},{duration:'fast'});
				if($(_elm).hasClass('wrapper-noimage')){
					$(_elm).closest('.megapannel').addClass('noimage');
				}else{
					$(_elm).closest('.megapannel').removeClass('noimage');
				}
			}
			function settabindex(_elm){
				var $focusable = $(_elm).find(':focusable');
				$focusable.first().addClass('focusFirst').end().last().addClass('focusEnd');
			}
			function focusfirst(_elm){
				if($('html').hasClass('pressTabkey')){
					$(_elm).find('.focusFirst').focus();
				}
			}
		});		
	};
	initializeMegaPanelNavigation();

	//MegaPanelNavigationAccessible
	var initializeMegaPanelNavigationAccessible = function() {
		var placeholderInterval;
		var $placeholder = $('#globalheader-nav').find('.megapannel-placeholder');
		var settabindex = function(_elm){
			var $focusable = $(_elm).find(':focusable');
			$(_elm).find('.focusFirst').removeClass('focusFirst');
			$(_elm).find('.focusEnd').removeClass('focusEnd');
			$focusable.first().addClass('focusFirst').end().last().addClass('focusEnd');
		};
		var focusfirst = function(_elm){
			if($('html').hasClass('pressTabkey')){
				$(_elm).find('.focusFirst').focus();
			}
		};
		var navclose = function(_target, callback){
			var navcontainer= $(_target).find('.megapannel-container');
			var navmenucats = $(_target).find('.megapannel');
			var $a = $(_target).find('.main-nav-root__title a');
			if(typeof callback !== 'function'){
				callback = function(){};
			}
			navcontainer.css('height','');
			if(Modernizr.csstransitions){
				navcontainer.one('transitionend', function(){
					navmenucats.attr('aria-hidden','true');
					$a.attr('aria-expanded','false');
					$(_target).removeClass('active');
					clearInterval(placeholderInterval);
					$placeholder.css('height','');
					callback();
				});
			} else {
				navmenucats.attr('aria-hidden','true');
				$a.attr('aria-expanded','false');
				$(_target).removeClass('active');
				clearInterval(placeholderInterval);
				$placeholder.css('height','');
				callback();
			}
			navmenucats.find('ul').first().children('li').children('.parbase').attr('aria-hidden','true');
		};
		var navopen = function(_target, callback){
			var navcontainer= $(_target).find('.megapannel-container');
			var navmenucats = $(_target).find('.megapannel');
			var $a = $(_target).find('.main-nav-root__title a');
			if(typeof callback !== 'function'){
				callback = function(){};
			}
			placeholderInterval = setInterval(function(){
				$placeholder.height(navcontainer.height());
			},10);
			navcontainer.height(navmenucats.outerHeight());
			navmenucats.attr('aria-hidden','false');
			$a.attr('aria-expanded','true');
			$(_target).addClass('active');
			settabindex(navmenucats);
			focusfirst(navmenucats);
			if(Modernizr.csstransitions){
				navcontainer.one('transitionend', function(){
					callback();
				});
			} else {
				callback();
			}
			navmenucats.find('ul').first().children('li').children('.parbase').attr('aria-hidden','false');
		};
		$('#globalheader-nav.accesible').find('.main-nav-root').each(function(index, element) {
			if($(this).has('.megapannel').length){
				var $this = $(this);
				var navcontainer= $this.find('.megapannel-container');
				var navmenucats = $this.find('.megapannel');
				var $a = $this.find('.main-nav-root__title a');
				var inbread = navmenucats.find('.inbread');
				var breadroot_text = $.trim($a.text());
				var active_child;
				var setHeight = function(){
					var parentUl = navmenucats.find('.parrays').first().children('ul');
					var _target = navmenucats.find('.parbase').filter(function(index) {
						if($(this).css('display') === 'block'){
							return this;
						}
					});
					if($(_target).closest('.wrapper-noimage').length) {
						navmenucats.addClass('noimage');
					} else {
						navmenucats.removeClass('noimage');
					}
					if($(_target).length){
						parentUl.height($(_target).outerHeight());
					}
					navcontainer.height(navmenucats.outerHeight());
				};
				// setup
				inbread.html('<span tabindex="0">' + breadroot_text + '</span>');
				if(navmenucats.find('.parrays').children().hasClass('wrapper-noimage')){
					navmenucats.addClass('noimage');
				}
				//$a.attr('aria-controls',navmenucats.attr('id')).attr('aria-expanded','false');
				$a.attr('aria-expanded','false');
				navmenucats.attr('aria-hidden','true');
				navmenucats.find('.parbase').each(function(index, element) {
					if(!$(this).parent('.noimage-container').length){
						$(this).attr('aria-hidden','true');
					}
				});
				// children
				navmenucats.find('li').has('ul,div.wrapper-noimage').children('.parbase').each(function(index, element) {
					var $this = $(this);
					var $a = $this.children('a');
					var child = $(this).next('ul,div.wrapper-noimage');
					var active_cat = $.trim($a.text());
					var hide_item = $this.closest('ul').children('li').children('.parbase');
					$a.on('click', function(e){
						e.preventDefault();
						$(this).attr('aria-expanded','true');
						inbread.find('span').each(function(index, element) {
							if(!$(this).find('a').length){
								var text = $(this).text();
								$(this).html('<a href="#'+$.trim(text)+'" title ="'+text+'">'+text+'</a>');
							}
						});
						inbread.append('<span class="subcat" tabindex="0"> ' + active_cat + '</span>');
						if($('html').hasClass('pressTabkey')){
							inbread.find('span').last().focus();
						}
						child.show().attr('aria-hidden','false');
						hide_item.fadeOut('fast',function(){
							child.children('li,div.noimage-container').children('.parbase').fadeIn({
								duration : 'fast',
								start : function(){
									setHeight();
								},
								complete : function(){
									settabindex(navmenucats);
								}
							}).attr('aria-hidden','false');
						}).attr('aria-hidden','true');
						active_child = child;
					});
				});
				//event
				inbread.on('click', 'a', function(e){
					e.preventDefault();
					var title = $(this).attr('title');
					var text = $(this).text();
					var nextAll = $(this).parent().nextAll().addClass('next');
					var indexNum = $(this).parent().index();
					var active_child_children_length = active_child.children('li,div.noimage-container').length;
					active_child.children('li,div.noimage-container').children('.parbase').each(function(index, val){
						$(this).fadeOut('fast',function(){
							active_child.removeAttr('style').attr('aria-hidden','true');
							active_child.prev('.parbase').find('a[aria-expanded=true]').attr('aria-expanded','false');
							if(indexNum <= 0){
								active_child.parent().parent('ul').removeAttr('style');
								navmenucats.find('.parrays > ul > li > .parbase').fadeIn({
									start : function(){
										active_child.closest('.megapannel').removeClass('noimage');
									},
									complete:function(){
										if(active_child_children_length-1 === index && $(this).parent().siblings().length === $(this).parent().index()){
											setHeight();
										}
										settabindex(navmenucats);
									}
								}).attr('aria-hidden','false');
							}else{
								active_child.parent().parent('ul').children('li').children('.parbase').fadeIn({
									start : function(){
										active_child.closest('.megapannel').removeClass('noimage');
									},
									complete : function(){
										active_child = $(this).parent().parent();
										settabindex(navmenucats);
									}
								}).attr('aria-hidden','false');
							}
						});
						$(this).filter(function(index) {
							if($(this).parent().is('li')){
								$(this).attr('aria-hidden','true');
							}
						});
					});
					
					nextAll.remove();
					$(this).parent().html(text);
					return false;
				});
				$a.on('click', function(e){
					e.preventDefault();
					if($this.hasClass('active')){
						navclose($this);
					} else {
						if($this.siblings().hasClass('active')){
							navclose($this.siblings('.active'), function(){
								navopen($this);
							});
						} else {
							navopen($this);
						}
					}
				});
				$a.on('keydown', function(e){
					if(e.keyCode === 9 && e.shiftKey === false && $(this).parent().hasClass('active')){
						e.preventDefault();
						navmenucats.find('.focusFirst').focus();
					}
				});
				navmenucats.find('.btn-slide').on('click', function(e){
					e.preventDefault();
					navclose($this, function(){
						if($('html').hasClass('pressTabkey')){
							$a.focus();
						}
					});
				});
				navmenucats.on('keydown', '.focusEnd', function(e){
					if(e.keyCode === 9 && e.shiftKey === false) {
						navclose($this);
					}
				});
				/*navmenucats.find('.parbase > a').each(function(index, element) {
					var href = $(this).attr('href');
					var child = $(this).parent('div').next('ul,div.wrapper-noimage');
					child.attr('aria-hidden','true');
					if (child.length) {
						$(this).attr('aria-expanded','false');
						var active_cat = $.trim($(this).text());
						var hide_item = $(this).parent().parent('li').parent('ul').children('li').children('.parbase');
						$(this).on('click', function(e){
							e.preventDefault();
							$(this).attr('aria-expanded','true');
							inbread.find('span').each(function(index, element) {
								if(!$(this).find('a').length){
									var text = $(this).text();
									$(this).html('<a href="#'+$.trim(text)+'" title ="'+text+'">'+text+'</a>');
								}
							});
							inbread.append('<span class="subcat" tabindex="0"> ' + active_cat + '</span>');
							if($('html').hasClass('pressTabkey')){
								inbread.find('span').last().focus();
							}
							child.show().attr('aria-hidden','false');
							hide_item.fadeOut('fast',function(){
								child.children('li,div.noimage-container').children('.parbase').fadeIn({
									duration : 'fast',
									start : function(){
										//setHeight(child);
										setHeight();
									},
									complete : function(){
										settabindex(navmenucats);
									}
								});
							});
							active_child = child;
							//bread();
						});
					}
				});*/
			}
		});
	};
	initializeMegaPanelNavigationAccessible();

	//secondarynav listmenu
	var gheaderlistmenu = function(){
		$('#globalheader-secondarynav .withlistmenu').each(function(index, element) {
			var $this = $(this);
			if(!$('html').hasClass('touch-device')){
				$this.on({
					'mouseenter' : function(e){
						$this.find('.listmenu').addClass('active').show();
					},
					'mouseleave' : function(e){
						$this.find('.listmenu').removeClass('active').hide();
					},
				});
				$this.children('a').on({
					'focus' : function(e){
						$this.find('.listmenu').addClass('active').show();
					},
					'keydown' : function(e){
						if(e.keyCode === 9 && e.shiftKey === true){
							$this.find('.listmenu').removeClass('active').hide();
						}
					}
				});
				$this.on('keydown', '.listmenu :focusable:first', function(e){
					if(e.keyCode === 9 && e.shiftKey === true){
						setTimeout(function(){
							$this.find('.listmenu').removeClass('active').hide();
						}, 100);
					}
				});
				$this.on('keydown', '.listmenu :focusable:last', function(e){
					if(e.keyCode === 9 && e.shiftKey === false){
						setTimeout(function(){
							$this.find('.listmenu').removeClass('active').hide();
						}, 100);
					}
				});
			} else {
				$(this).children('a').click(function(e){
          e.preventDefault();
          if($(this).parent().find('.listmenu').hasClass('active')){
            $(this).parent().find('.listmenu').removeClass('active').hide();
          } else {
            $(this).parent().find('.listmenu').addClass('active').show();
          }

				});
			}
		});
	}
	gheaderlistmenu();

	//secondarynav modalmenu
	var gheadermodalmenu = function(){
		$('#globalheader-secondarynav .withmodalmenu').each(function(index, element) {
			$(this).click(function(e) {
				e.preventDefault();
				gheadermodalmenuOpen(this);
			});
		});
		$(document).on("click", ".modalmenu .languageSelectorItem", function(e) {
			e.preventDefault();
		});
	}
	function gheadermodalmenuOpen(_target){
		if($('#lightbox-overlay').length){
			return this;
		}
		overlayset().done(function(){
      var _menu = $(_target).find('.modalmenu').clone();
      $('#lightbox-overlay').append('<div id="modalmenu-box-wrapper"><div id="modalmenu-box-bg"><div id="modalmenu-box"></div><a href="#" class="btn-close"><img src="/etc/designs/panasonic/common-clientlibs/images/btn-close.png" alt="Close"></a></div></div>');
      $('#modalmenu-box').append(_menu);
      $(window).scrollTop(0);
      focusedElementBeforeModal = jQuery(':focus');
      $('#lightbox-overlay').fadeIn(function(){
        setInitialFocusModal($(this));
        $(this).keydown(function(event){trapTabKey($(this),event);});
        $('#lightbox-bgcolor ,#modalmenu-box-wrapper .btn-close').click(function(e) {
          $('#lightbox-overlay').fadeOut(function(e){
            overlayRemove();
          });
          focusedElementBeforeModal.focus();
          return false;
        });
      });
    });
	}
	gheadermodalmenu();
	
	//langage selector
	$('#nav-menu-mob .lang, .navmenumob .lang').eq(0).bind('click', function(e){
		e.preventDefault();
		gheadermodalmenuOpen($('#globalheader-secondarynav .withmodalmenu .lang').eq(0).parent());
	});

	// Global nav products link event
	//var userbartop,browsebartop,bookmarkbartop,filterbartop,fixareatop;
	/*var barSetting = function(){
		if($('#userbar').length){
			userbartop = $('#userbar').offset().top;
			$('#browsebar-in').addClass('withuserbar');
		}else{
			userbartop = 0;
		}
		browsebartop = ($('#browsebar').length)? $('#browsebar').offset().top : 0;
		bookmarkbartop = ($('#bookmarkbar').length)? $('#bookmarkbar').offset().top : 0;
		filterbartop = ($('#filterbar').length)? $('#filterbar').offset().top : 0;
	}*/
	
	//optout cookies
	var optout_cookies;
	/* load and write cookies */
	//cookies ok
	var noteCookies = function(_container){
		$(_container).each(function(index, element) {
			var container = $(this);
			container.find('.btn-cookiesok').on('click', function(e){
				container.slideUp(function(){
					//$('.optout_container').addClass('already-optout');
					/* 	load and write cookies */
					$('.optout_container').removeClass('already-optout');
					GwcCommon.cookiePolicyOptIn.resolve();
				});
				return false;
			});
		});
	}
	noteCookies('#notescookies');
	noteCookies('#notescookies-rwd');
	if (!window.CookiePolicy || cookieStatus == 0) {
		GwcCommon.cookiePolicyOptIn.resolve();
	}
	
	//cookies opt out
	$('.optout_container').each(function(index, element) {
		var container = $(this);
		$(this).find('.btn-optout').on('click', function(e){
			if(!container.hasClass('already-optout')){
				container.addClass('already-optout');
				$(isMobile() ? '#notescookies-rwd' : '#notescookies').slideDown();
			}
			return false;
		});
		$(this).find('.btn-optin').on('click', function(e){
			if(container.hasClass('already-optout')){
				container.removeClass('already-optout');
				$(isMobile() ? '#notescookies-rwd' : '#notescookies').slideUp();
			}
			return false;
		});
	}); 

	//barSetting();
	//navmenucat
	$("#globalheader-nav .link-products:not(.link-megaPanel), #navmenucats .btn-slide").click(function(){
		if(browser == 'ie7or6') return true;
		$("#navmenucat .hide").slideToggle("slow",function(){
			//barSetting();
		});
		$('#link-products').parent().toggleClass("active");
		return false;
	});
	
	// userbar
	$(window).on('scroll resize load',function(e) {
		$('#userbar-wrapper').each(function(index, element) {
			if($(window).scrollTop() >= $(this).offset().top && $('#page').css('min-width')!='320px'){
				$(this).css('height',$('#userbar').height()+'px');
				$(this).find('#userbar').addClass('fix').css('top', '0px');
			}else {
				$(this).css('height', '');
				$(this).find('#userbar').removeClass('fix').removeAttr('style');
			}
		});
	});

	// browsebar
	$(window).on('scroll resize load',function(e) {
		$('#browsebar-wrapper').each(function(index, element) {
			if($(window).scrollTop() >= $(this).offset().top - $('#userbar').height()){
				$(this).height($(this).find('#browsebar').outerHeight());
				$(this).find('#browsebar').addClass('fix').css('top', $('#userbar').height() + 'px');
			}else {
				$(this).css('height','');
				$(this).find('#browsebar').removeClass('fix').removeAttr('style');
			}
			//if($('#browsebar').find('.sharebtn').length) addthis_config.ui_offset_top = $(window).scrollTop();
			$('#browsebar').find('.sharebtn a.addthis_button').hover(
				function(){
					 addthis_config.ui_offset_top = $(window).scrollTop();
				},
				function(){
					 addthis_config.ui_offset_top = 0;
				}
			);
		});
	});
	
	//browsebar-buy
	$('#browsebar').on('click', '#browsebar-buy a', function(e) {
		if($(this).attr('href')=="#" || $(this).attr('href').indexOf("javascript:void(0)") !=-1 && !$(this).hasClass('cart-direct')){
			$('#browsebar-buyslide .layer-slide').slideToggle();		
			return false;
		}
	});
	
	// bookmarkbar
	$(window).on('scroll resize load',function(e) {
		$('#bookmarkbar-wrapper').each(function(index, element) {
			if($(window).scrollTop() >= $(this).offset().top - $('#browsebar').height() - $('#userbar').height()){
				$(this).find('#bookmarkbar').addClass('fix').css('top', ($('#browsebar').height() + $('#userbar').height()) + 'px');
			}else {
				$(this).find('#bookmarkbar').removeClass('fix').removeAttr('style');
			}
		});
	});
	// filterbar
	$(window).on('scroll resize load',function(e) {
		if($('#page').css('min-width')!='320px'){
			$('#filterbar-wrapper').each(function(index, element) {
				if($(window).scrollTop() >= $(this).offset().top - $('#browsebar').height() - $('#userbar').height()){
					$(this).find('#filterbar').addClass('fix').css('top', ($('#browsebar').height() + $('#userbar').height()) + 'px');
				}else {
					$(this).find('#filterbar').removeClass('fix').removeAttr('style');
				}
			});
		}
	});
	// .fixarea
	$(window).on('scroll resize load',function(e) {
		if($('#page').css('min-width') !== '320px'){
			$('.fixarea-wrapper').each(function(index, element) {
				var fixarea = $(this).find('.fixarea');
				var preH = 0;
				$('.fixarea').each(function(i, e) {
					if(i<index){
						preH += $(this).height();
					}
				});
				if($(window).scrollTop() >= $(this).offset().top - $('#browsebar').height() - $('#userbar').height() - preH){
					$(this).css('height',fixarea.height()+'px');
					fixarea.addClass('fix').css('top', (preH + $('#browsebar').height() + $('#userbar').height()) + 'px');
				}else {
					$(this).css('height','auto');
					fixarea.removeClass('fix').removeAttr('style');
				}
			});
		}
	});
	
	
	// Footer Area/Country link event
	$("#globalfooter-nav li:not(.links-root) .btn-fooslide").each(function(index, element) {
		var target = $(this).attr('data-content');
		var container = $('#globalfooter-expanded-in');
		$('#' + target).attr('aria-hidden','true');
		if($('#globalfooter-expanded #'+target).length){
			$(this).attr('aria-expanded','false').attr('aria-controls',target);
		}
		$(this).click(function(){
			var $this = $(this);
			if(browser === 'ie7or6') return true;
			if(!$('#globalfooter-expanded #'+target).length) return true;
			if(container.css('display') === 'none'){
				$('#'+target).css({'display' : 'block'}).attr('aria-hidden','false');
				$('#'+target).siblings().css({'display' : 'none'}).attr('aria-hidden','true');
				container.slideDown('slow',function(){
					$this.attr('aria-expanded','true');
					$('html, body').animate({
						scrollTop: ($('#globalfooter-expanded').offset().top)-83
					}, 1000);
				});
				$(this).addClass('active');
				if($('#globalfooter-expanded .closeit').css('display') === 'none'){
					container.find('h2').first().attr('tabindex','0');
				}
				container.find(':focusable').first().focus();
			}else if($(this).hasClass('active')){
				container.slideUp('slow');
				$('#'+target).attr('aria-hidden','false');
				$(this).removeClass('active').attr('aria-expanded','false');
			}else{
				$('#'+target).css({'display' : 'block'}).attr('aria-hidden','false');
				$('#'+target).siblings().css({'display' : 'none'}).attr('aria-hidden','true');
				$(this).parent().siblings().find('a').removeClass('active').attr('aria-expanded','false');
				$(this).addClass('active').attr('aria-expanded','true');
			}
			return false;
		});
			
	});
	$('#globalfooter-expanded .btn-slide').click(function(){
		$('#globalfooter-expanded .hide').slideUp('slow');
		$('#globalfooter-expanded .pancontents').children().attr('aria-hidden','true');
		$("#globalfooter-nav .btn-fooslide.active").focus().removeClass('active').attr('aria-expanded','false');
		return false;
	});
	
	//footer expanded accessible
	(function(){
		var $placeholder = $('#globalfooter-nav .links').find('.globalfooter-expanded-placeholder');
		var placeholderInterval;
		var openPan = function(_target, clallback){
			var $container = $(_target).find('.globalfooter-expanded-container');
			var $pannel = $(_target).find('.globalfooter-expanded');
			var $a = $(_target).find('.links-root-item a.btn-fooslide');
			if(typeof callback !== 'function'){
				callback = function(){};
			}
			placeholderInterval = setInterval(function(){
				$placeholder.height($container.outerHeight());
			}, 10);
			$container.height($pannel.outerHeight());
			$pannel.attr('aria-hidden','false');
			$a.addClass('active').attr('aria-expanded','true');
			$('html, body').animate({
				scrollTop: ($pannel.offset().top)-83
			}, 1000);
			if(Modernizr.csstransitions){
				$container.one('transitionend', function(){
					$container.find(':focusable').first().focus();
					callback();
				});
			} else {
				$container.find(':focusable').first().focus();
				callback();
			}
		};
		var closePan = function(_target, callback){
			var $container = $(_target).find('.globalfooter-expanded-container');
			var $pannel = $(_target).find('.globalfooter-expanded');
			var $a = $(_target).find('.links-root-item a.btn-fooslide');
			if(typeof callback !== 'function'){
				callback = function(){};
			}
			$container.css('height','');
			if(Modernizr.csstransitions){
				$container.one('transitionend', function(){
					$pannel.attr('aria-hidden','true');
					$a.removeClass('active').attr('aria-expanded','false');
					clearInterval(placeholderInterval);
					$placeholder.css('height','');
					callback();
				});
			} else {
				$pannel.attr('aria-hidden','true');
				$a.removeClass('active').attr('aria-expanded','false');
				clearInterval(placeholderInterval);
				$placeholder.css('height','');
				callback();
			}
		};
		$("#globalfooter-nav li.links-root").has('.btn-fooslide').has('.globalfooter-expanded').each(function(index, element) {
			var $this = $(this);
			var $a = $this.find('.links-root-item a.btn-fooslide');
			var $container = $this.find('.globalfooter-expanded-container');
			var $pannel = $this.find('.globalfooter-expanded');
			//setup
			$pannel.attr('aria-hidden','true');
			$a.attr('aria-expanded','false');
			//event
			$a.on('click', function(e){
				e.preventDefault();
				if($a.hasClass('active')){
					closePan($this);
				} else {
					if($this.siblings().has('.active').length){
						closePan($this.siblings().has('.active') , function(){
							openPan($this);
						});
					} else {
						openPan($this);
					}
				}
			});
			$container.find('.btn-slide').on('click', function(e){
				e.preventDefault();
				closePan($this, function(){
					$a.focus();
				});
			});
		});
	})();
	
	// Area Country Tabs initialization
	$("#areacountry .tabs").tabs({
	fx: { 
		opacity: 'toggle' 
		}
	});
	//$("#areacountry .tabs").find("li").find("a").attr("tabindex","-1");
	$("#areacountry .tabs").find("li").on('click, focus', function(){
		//$(this).find("a").attr("tabindex","0");
	});
	$('#areacountry .area-country-text').text($('#areacountry select option').eq(0).text());
	$('#areacountry select').on('change',function(){
		$('#areacountry .tabs').tabs('option', 'active', $(this).val());
		$('#areacountry .area-country-text').text($('#areacountry select option').eq($(this).val()).text());
	});
	
	
	//backToTop
	$('#globalfooter .pagetop a, #utility .anchorcopy a, #float-btn-backtotop .btn a').click( function(event){
		$.scrollTo(
			0,
			{
				duration: 1000,
				easing: 'easeOutExpo',
				offset: { 'left':0, 'top':0}
			}
		);
		return false;
	});
	$('#float-btn-backtotop').hide();
	$(window).on('scroll', function(){
		var showPosition = ($('html').css('min-width')=='320px') ? 350 : 720;
		if($(window).scrollTop() > showPosition){
			$('#float-btn-backtotop').show();
		}else{
			$('#float-btn-backtotop').hide();
		}
	});
	
	//product-box energy label
	$(document).on('click', '.product-energy > a', function(index, element) {
		var url = $(this).attr('href');
		var alt = $(this).attr('data-alt');
		var title = $(this).attr('data-title');
		picBoxOpen(url,alt,title);
		return false;
	});
});


function productBoxH($root){
	jQuery(function($){
		$root = $root || $(document);
		var $productBoxIn = $('.product-box-in', $root);
		if ($productBoxIn.length <= 0) {
			return;
		}
		var _h = 0;
		$('.product-box-in, .product-box-in > a, .product-box-in > div:first-child, .product-box-in .product-price, .product-box-in  .product-copy', $root).css('height','auto');
		$.each(['.product-box-in .product-price', '.product-box-in .product-copy', '.product-box-in > a:first-child', '.product-box-in > a:last-child', '.product-box-in > div:first-child'], function(i, selector) {
			var $productBoxInElem = $(selector, $root);
			if ($productBoxInElem.length <= 0) {
				return;
			}
			var maxHeight = Math.max.apply(null,
				$.makeArray($productBoxInElem.map(function() { return $(this).height(); }))
			);
			$productBoxInElem.height(maxHeight);
		})
		$productBoxIn.each(function() {
			_h = Math.max($(this).height(), _h);
		}).height(_h).trigger('resize-product-box.gwc');
	});
}

jQuery(window).on('load',function(e) {
	if(typeof $.fn.productboxHAdjst === 'function') return false;
	if(!jQuery('.pagesectioncomponent').length || jQuery('#page').css('min-width')!='320px'){
		productBoxH();
	}
});
if(jQuery('html').hasClass('opacity')){
	jQuery(window).on('resize',function(e) {
		if(typeof $.fn.productboxHAdjst === 'function') return false;
		if(!jQuery('.pagesectioncomponent').length || jQuery('#page').css('min-width')!='320px'){
			productBoxH();
		}
	});
}

//Overlay

var focusableElementsString ="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
var focusedElementBeforeModal;
function trapTabKey(obj,evt) {
	// if tab or shift-tab pressed
	if ( evt.which == 9 ) {
		// get list of all children elements in given object
		var o = obj.find('*');
		// get list of focusable items
		var focusableItems;
		focusableItems = o.filter(focusableElementsString).filter(':visible')
		// get currently focused item
		var focusedItem;
		focusedItem = jQuery(':focus');

		// get the number of focusable items
		var numberOfFocusableItems;
		numberOfFocusableItems = focusableItems.length
		// get the index of the currently focused item
		var focusedItemIndex;
		focusedItemIndex = focusableItems.index(focusedItem);
		if (evt.shiftKey) {
			//back tab
			// if focused on first item and user preses back-tab, go to the last focusable item
			if(focusedItemIndex==0){
				focusableItems.get(numberOfFocusableItems-1).focus();
				//focusableItems.get(numberOfFocusableItems-1).select();
				evt.preventDefault();
			}
		} else {
			//forward tab
			// if focused on the last item and user preses tab, go to the first focusable item
			if(focusedItemIndex==numberOfFocusableItems-1){
				focusableItems.get(0).focus();
				//focusableItems.get(numberOfFocusableItems-1).select();
				evt.preventDefault();				
			}
		}
	}

}
function setInitialFocusModal(obj){
	// get list of all children elements in given object
	var o = obj.find('*');
	// set focus to first focusable item
	var focusableItems;
	focusableItems = o.filter(focusableElementsString).filter(':visible').first().focus();
}
function overlayset(_fix){
	var fix = _fix || 'fix';
  var d = new $.Deferred();
	jQuery(function($){
		$('body').addClass('lightbox-lock');
		$('body').append('<div id="lightbox-overlay"><div id="lightbox-bgcolor"></div></div>');
		setWH();
		if(fix=='fix'){
			$('#lightbox-bgcolor').on('mousewheel', function(e){
				e.preventDefault();
			});
		}
		if($('html').hasClass('touch-device') && fix=='fix'){
			$('#lightbox-bgcolor, #modalwindow *').on('touchmove',function(e){
				e.preventDefault();
			});
			if(navigator.userAgent.indexOf("Android 2") == -1){
				var sctop = $(window).scrollTop();
				$(window).on('scroll', {top:sctop} ,overlayFix);
			}else{
				$('body').on('touchmove',function(e){e.preventDefault();});
			}
		}
		$(window).bind('resize',function(e){
			setWH();
		});
		function setWH(){
			var _h = Math.max($(window).height(),$('body').height());
			var _w = $('body').width();
			$('#lightbox-bgcolor').css({'height':_h+'px', 'width':_w+'px'});
		}
    d.resolve();
	});
  return d.promise();
}
function overlayFix(event){
	$(window).scrollTop(event.data.top);
}
function overlayRemove(){
	jQuery(function($){
		if($('html').hasClass('touch-device')){
			$(window).off('scroll', overlayFix);
			$('body').off('touchmove');
		}
		$('body').removeClass('lightbox-lock').css('top','auto');
		$('#lightbox-overlay').remove();
	});
}

function picBoxOpen(_target,_alt,_title){
	overlayset('nonfix');
	jQuery(function($){
		$('#lightbox-overlay').append('<div id="pic-box-wrapper"><div id="pic-box-bg"><div id="pic-box"></div><a href="#" class="btn-close"><img src="/etc/designs/panasonic/common-clientlibs/images/btn-close.png" alt="Close"></a></div></div>');
		var alt = _alt || "";
		var title = _title || "";
		$('#pic-box').append('<img src="'+_target+'" alt="'+alt+'" title="'+title+'">');
		$('#pic-box').children('img').eq(0).on('load', function(e) {
			positionSetting('#pic-box-wrapper');
		});
		focusedElementBeforeModal = jQuery(':focus');
		$('#lightbox-overlay').fadeIn(function(){
			setInitialFocusModal($(this));
			$(this).keydown(function(event){trapTabKey($(this),event);});
			$('#lightbox-bgcolor ,#pic-box-wrapper .btn-close').click(function(e) {
				$('#lightbox-overlay').fadeOut(function(e){
					overlayRemove();
				});
				focusedElementBeforeModal.focus();
				return false;
			});
		});
		
		function positionSetting(_box){
			var _wh = window.innerHeight ? window.innerHeight : $(window).height();
			var _ww = $('body').width();
			var _wSctop = $(window).scrollTop();
			var _bh = $(_box).outerHeight();
			if(_wh > _bh){
				$(_box).css({'top':(_wh-_bh)/2 + _wSctop + 'px'});
			}else{
				$(_box).css({'top':5 + _wSctop + 'px', 'height':(_wh-10) + 'px'});
			}
		}
	});
}


//youtube
YouTubeUtils = {};
YouTubeUtils.enableYouTube = true;
/* mod start scsk */
var youtubeVideos = [];

/*
var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
var youtubeVideos = [];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
tag.src = "//www.youtube.com/iframe_api";
*/
$(window).on('load', function() {
	if ($('#language-data').attr('cnty') != 'cn') {
		$.ajax({
			url: "https://www.youtube.com/iframe_api",
			method: 'HEAD',
			dataType: 'script',
			timeout: 500
		}).done(function(){
			var tag = document.createElement('script');
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			tag.src = "https://www.youtube.com/iframe_api";
		}).fail(function(){
			YouTubeUtils.enableYouTube=false;
			onYouTubeIframeAPIReady();
		});
	} else {
	    YouTubeUtils.enableYouTube=false;
		onYouTubeIframeAPIReady();
	}
});
/* mod end scsk */

function onYouTubeIframeAPIReady() {
	if(navigator.userAgent.indexOf("Android 2") == -1){
		$(".youtube-placeholder").each(function(index, video) {
			YouTubeUtils.setupPlayer(video,index);
		});
	}
	holderSize();
	$(window).bind('resize orientationchange', function(e){
		holderSize();
	});
	$(window).trigger('ytiframeapiready');
}
//Function create Video
YouTubeUtils.setupPlayer = function(_elm,index){
	var videoObj = $(_elm), playerID;
	var videoID = YouTubeUtils.videoParser(videoObj.attr('src'));
	var videoParam = YouTubeUtils.paramParser(videoObj.attr('src'));
	// additional video params on html tag attribute
	var additionalVideoParams = {};
	$.each($(_elm).data(), function(key) {
			var keyMatches = key.match(/^video\-?params\-?(.*)$/i);
			if (keyMatches && keyMatches.length >= 2) {
				additionalVideoParams[keyMatches[1].toLowerCase()] = $(_elm).data(key);
			}
		return additionalVideoParams;
	});
	videoParam = $.extend(additionalVideoParams, videoParam);
	if(videoObj.hasClass('chan-pana')){
		videoObj.attr('data-cpanaid',videoID);
		playerID = 'cpana' + String(videoID)+index;
	}else{
		playerID = videoID+index;
	}
	videoObj.append('<div id="'+playerID+'"/>');
	var videoTarget = videoObj.children('div');
	if (videoID != null) {
		if (videoObj.hasClass('youku-player')) {
			var youkuVideo = YouTubeUtils.createYkuPlayer(playerID, videoObj.data('clientid'), videoID, videoParam);
		}else if(videoObj.hasClass('chan-pana')){
			YouTubeUtils.chanpanaId = videoID;
			var pStatus = (videoObj.attr('data-editmode') && videoObj.attr('data-editmode')=='true')? 0 : 1 ;
			var aUrl = '//channel.panasonic.com/api/videoid/?v='+videoID+'&status='+pStatus;
			$.ajax({
				url: aUrl,
				type:'GET',
				dataType: 'jsonp',
				timeout:5000,
				success: function(data) {
					if (data.item.ytvideoid && data.item.ytvideoid != "") {
						videoParam.rel = 0; videoParam.wmode = 'transparent';
						YouTubeUtils.createYTPlayer(playerID, data.item.ytvideoid, videoParam);
					} else {
						if(videoObj.attr('data-endmessage')){
							videoTarget.addClass('closed').append('<span>'+videoObj.attr('data-endmessage')+'</span>');
						}
					}
					/*if(data[0].feed.length > 0){
						videoParam.rel = 0; videoParam.wmode = 'transparent';
						YouTubeUtils.createYTPlayer(playerID, data[0].feed[0].item.ytvideoid, videoParam);
					}else{
						if(videoObj.attr('data-endmessage')){
							videoTarget.addClass('closed').append('<span>'+videoObj.attr('data-endmessage')+'</span>');
						}
					}*/
				},
				error: function(data) {
				}
			});
		}else {
			videoParam.rel = 0; videoParam.wmode = 'transparent';
			YouTubeUtils.createYTPlayer(playerID, videoID, videoParam);
		}
	}
}
// Function Youtube Event
function onPlayerStateChange(event){
	var target = event.target.getIframe();
	if(event.data == 1 && $(target).parent().hasClass('chan-pana') && !$(target).parent().hasClass('played')){
		$(target).parent().addClass('played');
		var v = $(target).parent().attr('data-cpanaid');
		var aUrl = '//channel.panasonic.com/api/addcount/?v='+v;
		$.ajax({
			url: aUrl,
			type:'GET',
			dataType: 'jsonp',
			timeout:5000,
			success: function(data) {
				try {
					console.log(data);
				} catch(e){
				}
			},
			error: function(data) {}
		});
	}
}
// Function that stops all the YouTubeVideos
YouTubeUtils.stopYoutubeVideos = function() {
	for (var indexVideo = 0; indexVideo < youtubeVideos.length; indexVideo++) {
		if (youtubeVideos[indexVideo].stopVideo != null) {
			 youtubeVideos[indexVideo].stopVideo();
		}
	}
}
// Fuction to get the YouTube or Youku video ID
YouTubeUtils.videoParser = function(url){
	if (url && url.indexOf('youku\.com') > -1) {
		return YouTubeUtils.youkuParser(url);
	} else if(url.indexOf('youtube\.com') > -1 || url.indexOf('youtu\.be') > -1){
		return YouTubeUtils.youtubeParser(url);
	} else {
		return YouTubeUtils.chanpanaParser(url);
		//return url.split('?')[0];
	}
}
// Fuction to get the YouTube video ID
YouTubeUtils.youtubeParser = function(url){
    var regExp = /(youtube\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i;
    var regExpExec = regExp.exec(url);
    if (regExpExec && regExpExec[3]) {
        return regExpExec[3];
    }else{
        return null;
    }
}
// Fuction to get the Youku video ID
YouTubeUtils.youkuParser = function(url){
    var regExp = /(v\.youku\.com|player\.youku\.com)\/(v_show\/id_|embed\/)([^?]+?)(\.htm.*|\?.+|$)/i;
    var regExpExec = regExp.exec(url);
    if (regExpExec && regExpExec[3]) {
        return regExpExec[3];
    }else{
        return null;
    }
}
// Fuction to get the Channel Panasonic video ID
YouTubeUtils.chanpanaParser = function(url){
    var regExp = /(ch\.panasonic\.net|channel\.panasonic\.com)\/(embed\/)(\d+)\/.*/i;
    var regExpExec = regExp.exec(url);
    if (regExpExec && regExpExec[3]) {
        return regExpExec[3];
    }else{
        return null;
    }
}
// Fuction to get the YouTube or Youku video Param
YouTubeUtils.paramParser = function(url){
	if (url && url.indexOf('youku\.com') > -1) {
		/* same as Youtube*/
		return YouTubeUtils.youtubeParamParser(url);
	} else {
		return YouTubeUtils.youtubeParamParser(url);
	}
}

YouTubeUtils.youtubeParamParser = function(url){
    var regExp = /(\?.*)([^\?])/;
    var regExpExec = regExp.exec(url);
	var vars = new Object, params;
    if (regExpExec && regExpExec[0]) {
		var temp_params = regExpExec[0].replace(/\?/,'').split('&');
		for(var i = 0; i <temp_params.length; i++) {
			params = temp_params[i].split('=');
			vars[params[0]] = params[1];
		}
        return vars;
    }else{
        return {};
    }
}
/* Youtube Player */
YouTubeUtils.createYTPlayer = function(divId, ytId, param){
	var $iframeWrapper = $('#'+divId);
	if ($iframeWrapper.closest('.youtube-placeholder').is(':has(iframe)')) {
		$iframeWrapper.remove();
		return;
	}
	youtubeVideos.push(new YT.Player(divId, {
		width:'100%',
		height:'100%',
		videoId: ytId, 
		playerVars: param,
		events: {
			'onStateChange': onPlayerStateChange,
			'onReady' : function(e){
				var target = e.target.getIframe();
				if($(target).closest('.fullsizebackground-video').length){
					$(target).closest('.fullsizebackground-video').trigger('fullbgytready');
				}
			}
		}
	}));
}
/* Youku Player */
YouTubeUtils.createYkuPlayer = function(divId, ykuCId, ykuVId, param){
	var $iframeWrapper = $('#'+divId);
	if ($iframeWrapper.closest('.youtube-placeholder').is(':has(iframe)')) {
		$iframeWrapper.remove();
		return;
	}
	var $youkuFrame = $('<iframe>', {
		'id': 'iframe_p_'+divId,
		'src': '/servlet/ajax/sns/youku-player.html',
		'class': 'youku-player-iframe'
	}).css({
		'width': '100%',
		'height': '100%'
	}).on('load', function() {
		if (!!this.contentWindow && $.isFunction(this.contentWindow.createIframeYkuPlayer)) {
			var childYkPlayer = this.contentWindow.createIframeYkuPlayer(ykuCId, ykuVId, param);
			if (childYkPlayer && childYkPlayer != null) {
				youtubeVideos.push(childYkPlayer);
			}
			YouTubeUtils.switchVisibleYkuPlayerIframe($iframeWrapper);
		}
	});
	$iframeWrapper.append($youkuFrame);
}
/* scsk add start */
YouTubeUtils.switchVisibleYkuPlayerIframe = function(target, isVisible) {
	var playerIframe = $('iframe', target)[0];
	if (!!playerIframe && $.isFunction(playerIframe.contentWindow.switchVisibleYkuPlayer)) {
		if (typeof isVisible != 'boolean') {
			isVisible = $(target).parent().is(':visible');
		}
		playerIframe.contentWindow.switchVisibleYkuPlayer(isVisible);
	}
};
jQuery.fn.switchVisibleYkuPlayer = function(isVisible) {
	return $(this).each(function() {
		YouTubeUtils.switchVisibleYkuPlayerIframe(this, isVisible);
	});
};
/* scsk add end */

function holderSize($root){
	$root = $root || document;
	var $d_resizeComplete = $.Deferred();
	jQuery(function($){
		if($('#page').css('min-width') == '320px'){
			var $youtubePlaceholder = $(".youtube-placeholder:visible", $root);
			if ($youtubePlaceholder.length <= 0) {
				$d_resizeComplete.resolve(); // add
				return;
			}
			if(navigator.userAgent.indexOf("Android 2") != -1){
				setTimeout(function(){
					for (var indexVideo = 0; indexVideo < youtubeVideos.length; indexVideo++) {
						if (youtubeVideos[indexVideo].destroy != null) {
							 youtubeVideos[indexVideo].destroy();
						}
					}
					youtubeVideos = [];
					$youtubePlaceholder.each(function(index, video) {
						var parents = $(this).parents();
						var display = true;
						$(parents).each(function(i, ele) {
							if($(this).css('display')=='none'){
								display = false;
								return false;
							}
						});
						$(this).children().remove();
						for(var i in $(parents)){
							if($(parents).eq(i).css('display')=='none'){
								display = false;
								break;
							}
						}
						if(display==true){
							YouTubeUtils.setupPlayer(video,index);
						}
					});
				},500);
			}
			var resizedCnt = 0;
			$d_resizeComplete.progress(function(secceed) {
				resizedCnt++;
				if (resizedCnt >= $youtubePlaceholder.length) {
					$d_resizeComplete.resolve();
				}
			});
			$youtubePlaceholder.each(function(index, element) {
				var intervalId;
				var retryCnt = 0;
				videoSize(this);
				function videoSize(_v){
					if (retryCnt >= 30) {
						// clearInterval(intervalId);
						$d_resizeComplete.notify(false);
					}
					var _this = _v;
					var _pw = $(_this).parent().width();
					var _w = (_pw!=0)? _pw : $(window).width() - 20;
					$(_this).css({'height':9*_w/16 + 'px'});
					if($(_this).closest('.ext-table').length && !$(_this).closest('.ui-tabs-panel').length && !$(_this).closest('.slide-block').length){
						$(_this).closest('.ext-table').children('table').css('table-layout','fixed');
						intervalId = setInterval(function(){
							if(Math.round($(_this).outerWidth()/16 - $(_this).height()/9) == 0){
								clearInterval(intervalId);
								$d_resizeComplete.notify(true);
							}else{
								videoSize(_v);
								retryCnt++;
							}
						},100);
					} else {
						$d_resizeComplete.notify(true);
					}
				}
			});
		} else {
			$d_resizeComplete.resolve();
		}
	});
	// add return value(Deferred object)
	return $d_resizeComplete.promise();
}

//swapimage

function swapImg(Class,ov,img){
	jQuery(function($){
		$(Class).each(function(){
			var target;
			if(img){
				target = $(this).find(img);
			}else{
				target = $(this).find('img')
			}
			if(target.length){
				var src = target.attr('src');
				src.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i);
				var srcOv = RegExp.leftContext + ov + '.' +RegExp.$1;
				var srcOvImg = new Image();
				srcOvImg.src = srcOv;
				
				$(this).mouseover(function(){
					target.attr('src',srcOv);
				});
				$(this).mouseout(function(){
					 target.attr('src',src);
				});
			}
		});
	});
}

//copyguard
;(function($){
	$.fn.copyguardImage = function(){
		if($('#page').css('min-width')!='320px'){
			$.each(this, function(index, value){
				var target = $(this);
				$(this).on('contextmenu', function(e){
					return false;
				});
				if($(this).get(0).tagName == 'img' || $(this).get(0).tagName == 'IMG' ){
					var slider = $(this).parents('.slider');
					if(!slider.length && $('html').hasClass('backgroundsize')){
						
						$(this).on('dragstart', function(e){
							e.preventDefault();
							return false;
						});
						if(window.navigator.taintEnabled != undefined){
							/* del start. WHY? load the image at async.
							var src = $(this).attr("src");
							// del end */
							var _this = $(this);
							$(this).css({
								webktBackgroundSize:"100%",
								backgroundSize:"100%"
							});
							$(this).on('mouseover', function(e){
								var src = $(this).attr("src");
								if (src == 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D') {
									return;
								}
								$(this).data('org-src', src);
								var w = $(this).width();
								var h = $(this).height();
								$(this).css({'background-image':"url(\""+encodeUriWithoutParams(src)+"\")"}).width(w).height(h).attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D");
							});
							$(this).on('mouseout', function(e){
								var src = $(this).data("org-src");
								$(this).attr("src",src).css({'background-image':"none"});
							});
						}
		
					}
				}
			});
			$('.copyguradimage').on('contextmenu', function(e){
				return false;
			});
		}
		if($('#page').css('min-width')=='320px' && navigator.userAgent.match(/Android/i)){
			var dummy = new Image();
			dummy.src = "/etc/designs/panasonic/common-clientlibs/images/pixel.png";
			$(this).filter('img').each(function(index, element) {
				/* del start. WHY? load the image at async.
				var imgsrc = $(this).attr('src');
				// del end */
				var _this = this;
				$(_this).on('touchstart mouseover focus mousedown tap click',function(e){
					//var _this = this;
					var imgsrc = $(_this).attr('src');
					if (imgsrc.match(dummy.src)) {
						return;
					}
					var w = $(_this).width();
					var h = $(_this).height();
					$(_this).attr("src",dummy.src).width(w).height(h);
					$(_this).css({
						"background":"url(\""+encodeUriWithoutParams(imgsrc)+"\") no-repeat",
						webktBackgroundSize:"100%",
						backgroundSize:"100%"
					});
					$(_this).data('src-org', imgsrc);
				});
				if(navigator.userAgent.indexOf("Android 2") != -1){
					$(_this).on('load', function(e){
						var imgsrc = $(_this).attr('src');
						if (imgsrc.match(dummy.src)) {
							return;
						}
						var styleTmp = $(_this).attr('style');
						$(_this).removeAttr('style');
						var $parent = $(_this).parent();
						$parent.children().detach().appendTo($parent);
						var w = $(_this).width();
						var h = $(_this).height();
						$(_this).attr('style', styleTmp);
						if(w && w!=0){
							$(_this).attr("src",dummy.src).width(w).height(h);
							$(_this).css({
								"background":"url(\""+encodeUriWithoutParams(imgsrc)+"\") no-repeat",
								webktBackgroundSize:"100%",
								backgroundSize:"100%"
							});
							$(_this).data('src-org', imgsrc);
						}
					});
				}
				$(window).on('resize', function(e){
					var imgsrc = $(_this).attr('src');
					if (imgsrc.match(/\/etc\/designs\/panasonic\/common-clientlibs\/images\/pixel.png/)) {
						imgsrc = $(_this).data('src-org');
					}
					if (!imgsrc || imgsrc.match(/\/etc\/designs\/panasonic\/common-clientlibs\/images\/pixel.png/)) {
						return;
					}
					$(_this).attr('src',imgsrc).removeAttr('style');
				});
			});
		}
		function encodeUriWithoutParams(uri) {
			if (!uri) return uri;
			var uriOrParamsArray = uri.split('?');
			var encodedUri = encodeURI(uriOrParamsArray.shift());
			return [encodedUri].concat(uriOrParamsArray).join('?');
		}
	};
})(jQuery);

jQuery(function($){
	$('.copyguard').copyguardImage();
});

/************************** Search-autocomplete *****************************/

;(function($){
	$.fn.mobileSearch = function(){
		if(!this.length){
			return this;
		}
		if(this.length > 1){
			this.each(function(){
				$(this).mobileSearch();
			});
			return this;
		}
		var el = this,
			$button = el.find('.search-normal-mobile-label'),
			$box = el.find('.search-normal-box');
			label = el.find('.search-normal-mobile-label .label').data('open-alt'),
			closealt = el.find('.search-normal-mobile-label .label').data('close-alt');
		el.data('mobileSearch', el);
		if($('link[href*="header-white"]').length){
			$button.find('span.label').append('<img src="/etc/designs/panasonic/searchautocomplete-clientlibs/images/icn-search@2x.png" alt="'+label+'" class="open"><img src="/etc/designs/panasonic/common-clientlibs/images/icn-search-close-bk-m.png" alt="'+label+'" class="close">');
		} else {
			$button.find('span.label').append('<img src="/etc/designs/panasonic/searchautocomplete-clientlibs/images/icn-search-w@2x.png" alt="'+label+'" class="open"><img src="/etc/designs/panasonic/searchautocomplete-clientlibs/images/icn-search-close-m.png" alt="'+label+'" class="close">');
		}
		$button.attr('aria-expanded','false').nextAll('.gcse-box, .search-normal-box').attr('aria-hidden','true');
		$button.on({
			'click' : function(e){
				el.action($(this).parent());
			},
			keydown : function(e){
				if(e.keyCode == 13){
					el.action($(this).parent());
				}
			}
		});
		el.action = function(){
			if(el.hasClass('active')){
				el.searchclose();
			} else {
				el.searchopen();
				//mobile nav close
				if($('#mobile-navigation').hasClass('active')){
					$('#mobile-navigation').data('mobileNavigation').menuclose();
				}
			}
		};
		el.searchopen = function(){
			el.addClass('active');
			$box.attr('aria-hidden','false').children().eq(0).css('visibility','visible');
			el.find('#s').focus();
			$button.attr('aria-expanded', 'true');
		};
		el.searchclose = function(){
			el.removeClass('active');
			$box.one('transitionend', function(){
				$box.children().eq(0).css('visibility','');
			}).attr('aria-hidden','true');
			$button.attr('aria-expanded', 'false');
		};
	};
})(jQuery);
jQuery(function($){
	$('#search-normal').mobileSearch();
});

/************************** header panel navigation 2018 *****************************/
;(function($){
	'use strict';
	$.fn.mainmenu_inc_consumerpanel = function(){
		if(!this.length) {
			return this;
		}
		if(this.length > 1){
			$(this).each(function(){
				$(this).mainmenu_inc_consumerpanel();
			});
			return this;
		}
		if(!this.has('.consumerpanel').length) {
			return this;
		}
		var el = this,
			$panellink = el.find('.link-consumerpanel'),
			$panelwrapper = el.find('.consumerpanel__wrapper'),
			$placeholder = el.find('.consumerpanel__placeholder'),
			$animateItems = el.find('.consumerpanel, .consumerpanel__products__list-child__wrapper'),
			placehold = setInterval(function(){
				var maxh = Math.max.apply(null, $.makeArray($panelwrapper.map(function(){
					return $(this).outerHeight();
				})));
				$placeholder.height(maxh);
			}, 20);
		el.closepanel = function(_item, _option/* = { complete: null, start: null }*/){
			$(_item).closest('.main-nav-root').find('.consumerpanel').slideUp(400, function(){
				if(typeof _option !== 'undefined' && typeof _option.complete ==='function') {_option.complete();}
			}).attr('aria-hidden','true');
			$(_item).attr('aria-expanded','false');
			$(_item).closest('.main-nav-root').removeClass('active');
		};
		el.openpanel = function(_item, _option/* = { complete: null, start: null }*/){
			$(_item).closest('.main-nav-root').find('.consumerpanel').slideDown(400, function(){
				$(this).find(':focusable').eq(0).focus();
				el.setItemHeight(this);
				if(typeof _option !== 'undefined' && typeof _option.complete ==='function') {_option.complete();}
			}).attr('aria-hidden','false');
			$(_item).attr('aria-expanded','true');
			$(_item).closest('.main-nav-root').addClass('active');
			if(typeof _option !== 'undefined' && typeof _option.start ==='function') {_option.start();}
		};
		el.setItemHeight = function(_panel){
			var $item = $(_panel).find('.consumerpanel__products__item'),
				$a = $('> .parbase > .incimg', $item),
				maxH = Math.max.apply(null, $.map($.makeArray($a), function(element, index){
				return $(element).outerHeight();
			}));
			$a.css('height', maxH + 'px');
		};
		el.data('cpanel', el);
		$panellink.each(function(){
			var $thislink = $(this),
				$root = $thislink.closest('.main-nav-root'),
				$panel = $root.find('.consumerpanel'),
				$plist = $panel.find('.consumerpanel__products__list'),
				$item = $panel.find('.consumerpanel__products__item'),
				$inc_child_item = $item.has('.consumerpanel__products__list-child__wrapper'),
				$learnabout = $panel.find('.consumerpanel__learnabout'),
				$learnabout_list = $learnabout.find('.consumerpanel__learnabout__list'),
				setposition = function(_elm){
					var $parent = $(_elm).closest('.consumerpanel__products__item'),
						pleft = $parent.position().left;
					if($('body').hasClass('width-nolimit')){
						$(_elm).width($panel.outerWidth());
					}
					if($('body').css('direction') !== 'rtl'){
						$(_elm).css('margin-left', - pleft + 'px');
					} else {
						$(_elm).css('margin-right', - ($(_elm).outerWidth() - pleft - $parent.outerWidth()) + 'px');
					}

				},
				closechild = function(_item, _child, _callback){
					$(_child).slideUp(400, function(){
						if(typeof _callback ==='function') {_callback();}
					}).attr('aria-hidden','true');
					$(_item).find('a').eq(0).attr('aria-expanded', 'false').removeClass('active');
				},
				openchild = function(_item, _child, _callback){
					setposition($(_child));
					$(_child).slideDown(400, function(){
						if(typeof _callback ==='function') {_callback();}
					}).attr('aria-hidden','false');
					$(_item).find('a').eq(0).attr('aria-expanded', 'true').addClass('active');
				};
			$panel.find('.closeit .btn-slide').on('click', function(e){
				e.preventDefault();
				el.closepanel($thislink);
				$thislink.focus();
			});
			$thislink.on('click', function(e){
				e.preventDefault();
				if($animateItems.filter(':animated').length){
					return this;
				}
				var $activeitem = $root.siblings().filter('.active');
				if($root.hasClass('active')){
					el.closepanel($thislink);
				} else {
					if($activeitem.length){
						el.closepanel($activeitem, { complete: function(){
							el.openpanel($thislink);
						}});
					} else {
						el.openpanel($thislink);
					}
				}
			});
			$panel.on('keydown', ':focusable:last', function(e){
				if(e.keyCode === 9 && !e.shiftKey){
					e.preventDefault();
					el.closepanel($thislink);
					$thislink.focus();
				}
			});
			$plist.on('click', function(e){
				e.stopPropagation();
			});
			$item.on('click', function(e){
				e.stopPropagation();
			});
			$inc_child_item.each(function(index, element){
				var $this = $(this),
					$child_panel = $(this).find('.consumerpanel__products__list-child__wrapper').eq(0),
					clinkId = $panel.attr('id') + '-clink-' + index,
					cpanelId = $panel.attr('id') + '-cpanel-' + index;
				//setup
				$this.attr({}).find('a').eq(0).attr({'aria-expanded': 'false', 'aria-controls': cpanelId});
				$child_panel.attr({'aria-hidden':'true', 'id': cpanelId});
				//click
				$this.find('a').eq(0).on('click', function(e){
					e.preventDefault();
					var $openeditem = $this.siblings().filter(function(){
						if($(this).find('a').eq(0).attr('aria-expanded') === 'true'){
							return this;
						}
					}),
						$openedpanel = $openeditem.find('.consumerpanel__products__list-child__wrapper').eq(0);
					if($animateItems.filter(':animated').length){
						return this;
					}
					if($(this).attr('aria-expanded') === 'false'){
						if($openeditem.length){
							closechild($openeditem, $openedpanel, function(){openchild($this,$child_panel);});
						} else {
							openchild($this,$child_panel);
						}
					} else {
						closechild($this,$child_panel);
					}
				});
				$this.find('a').eq(0).on('click', function(e){
					e.preventDefault();
				});
			});
		});
		return this;
	};

	$(function(){
		$('#globalheader-nav').mainmenu_inc_consumerpanel();
	});
})(jQuery);

/************************** Mobile Navigation *****************************/
;(function($){
	$.fn.mobileNavigation = function(){
		if(!this.length){
			return this;
		}
		if(this.length > 1){
			this.each(function(){
				$(this).mobileNavigation();
			});
			return this;
		}
		var el = this,
			$toggleMenu = el.find('.toggleMenu'),
			$navMenuMob = el.find('.navmenumob'),
			$navMenuMob_id = '',
			$navMenuMob_link = $navMenuMob.find('.navmenumob__listitem > a');
		el.data('mobileNavigation', el);
		if(!el.is('.inc_consumerpanelmob')){
			$navMenuMob = el.find('#nav-menu-mob');
			$navMenuMob_link = $navMenuMob.find('.accordion > li > a');
		}
		$navMenuMob_id = $navMenuMob.attr('id');
		$toggleMenu.attr('aria-expanded','false').on('click', function(e) {
			el.menutoggle();
			$navMenuMob.find(':focusable').first().focus();
		}).find('.label').filter(function(index) {
			if($('link[href*="header-white"]').length){
				$(this).html('<img src="/etc/designs/panasonic/common-clientlibs/images/icn-nav-global-menu-bk-m-2x.png" alt="'+$(this).text()+'" class="open"><img src="/etc/designs/panasonic/common-clientlibs/images/icn-search-close-bk-m.png" alt="'+$(this).text()+'" class="close">');
			} else {
				$(this).html('<img src="/etc/designs/panasonic/common-clientlibs/images/icn-nav-global-menu-m-2x.png" alt="'+$(this).text()+'" class="open"><img src="/etc/designs/panasonic/searchautocomplete-clientlibs/images/icn-search-close-m.png" alt="'+$(this).text()+'" class="close">');
			}
		});
		$navMenuMob.attr('aria-hidden','true');
		$navMenuMob_link.filter(function(i){
			var $child = $(this).siblings('.accordion');
			var id = $navMenuMob_id + '-accordion-' + i;
			if($child.length){
				$(this).addClass('accordion-head').attr({'aria-expanded': 'false', 'aria-controls': id});
				$child.css({'display':'none'}).attr({'aria-hidden': 'true', id: id});
				return this;
			}
		}).each(function(){
			var $this = $(this),
				$child = $this.siblings('.accordion'),
				$ul = ($child.is('ul')) ? $child : $child.children('ul').eq(0);
			$this.on('click', function(e) {
				e.preventDefault();
				$(this).toggleClass('active');
				/* for Async image load at header panel */
				if ($.isFunction($.fn.imageConverter)) {
					$('> li > a .img-element', $ul).add('> .consumerpanelmob__learnabout, > .consumerpanelmob__banner', $child).find('img[data-type="delay-load"]').filter(function() {
						return !$(this).data('ic-state');
					}).imageConverter();
				}
				$child.slideToggle(function(){
					if($(this).css('display')==='block'){
						$(this).attr('aria-hidden','false');
						$this.attr('aria-expanded', 'true');
					} else {
						$(this).attr('aria-hidden','true');
						$this.attr('aria-expanded', 'false');
					}
				});
			});
		});
		el.menutoggle = function(){
			if(el.hasClass('active')){
				el.menuclose();
			} else {
				el.menuopen();
				//search close
				if($('#search-normal').hasClass('active')){
				   $('#search-normal').data('mobileSearch').searchclose();
				}
			}
		};
		el.menuopen = function(){
			$navMenuMob.slideDown(function(){
				$navMenuMob.attr('aria-hidden','false');
				$toggleMenu.attr('aria-expanded', 'true');
			});
			el.addClass('active');
		};
		el.menuclose = function(){
			$navMenuMob.slideUp(function(){
				$navMenuMob.attr('aria-hidden','true');
				$toggleMenu.attr('aria-expanded', 'false');
			});
			el.removeClass('active');
		};
	};
})(jQuery);
jQuery(function($){
	$('#mobile-navigation').mobileNavigation();
});
