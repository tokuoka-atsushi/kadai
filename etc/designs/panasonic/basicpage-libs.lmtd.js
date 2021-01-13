// 配布用 anchor
// scrollend plugin
;(function(plugin) {
	var chicago = window.Chicago || {
		utils : {
			now: Date.now || function() {
				return new Date().getTime();
			},
			uid : function(prefix) {
				return ( prefix || 'id' ) + chicago.utils.now() + 'RAND' + Math.ceil( (window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * 1e5 );
			},
			is : {
				number : function(obj) {
					return ! isNaN( parseFloat( obj ) ) && isFinite( obj );
				},
				fn : function(obj) {
					return typeof obj === 'function';
				},
				object : function(obj) {
					return Object.prototype.toString.call(obj) === "[object Object]";
				}
			},
			debounce : function(fn, wait, immediate) {
				var timeout;
				return function() {
					var context = this,
						args = arguments,
						later = function() {
							timeout = null;
							if ( ! immediate ) {
								fn.apply( context, args );
							}
						},
						callNow = immediate && !timeout;
					if( timeout ) {
						clearTimeout(timeout);
					}
					timeout = setTimeout( later, wait );
					if( callNow ) {
						fn.apply( context, args );
					}
				};
			},
		},
		$ : window.jQuery || null
	};

	if(typeof define === 'function' && define.amd) {
		define('chicago', function() {
			chicago.load = function(res, req, onload, config) {
				var resources = res.split(','),
					load = [];
				var base = ( config.config && config.config.chicago && config.config.chicago.base ? config.config.chicago.base : '' ).replace( /\/+$/g, '' );
				if( ! base ) {
					throw new Error( 'Please define base path to jQuery scrollend in the requirejs config.' );
				}
				var i = 0;
				while(i < resources.length) {
					var resource = resources[i].replace(/\./g, '/');
					load.push(base + '/' + resource);
					i += 1;
				}
				req(load, function() {
					onload( chicago );
				});
			};
			return chicago;
		});
	}

	if( window && window.jQuery ) {
		return plugin( chicago, window, window.document );
	} else if( ! window.jQuery ) {
		throw new Error( 'jQuery scrollend requires jQuery' );
	}

})(function(_c, win, doc) {

	_c.$win = _c.$(win);
	_c.$doc = _c.$(doc);

	if( ! _c.events ) {
		_c.events = {};
	}

	_c.events.scrollend = {
		defaults : {
			delay : 250
		},
		setup: function(data) {
			var args = arguments,
				options = {
					delay : _c.$.event.special.scrollend.defaults.delay
				},
				fn;

			if( _c.utils.is.fn( args[0] ) ) {
				fn = args[0];
			} else if( _c.utils.is.number( args[0] ) ) {
				options.delay = args[0];
			} else if( _c.utils.is.object( args[0] ) ) {
				options = _c.$.extend({}, options, args[0]);
			}

			var uid = _c.utils.uid('scrollend'),
				_data = _c.$.extend({
					delay: _c.$.event.special.scrollend.defaults.delay
				}, options),
				timer = null,
				scrolling = false,
				handler = function(e) {
					if(timer) {
						clearTimeout(timer);
					} else {
						e.type = 'scrollend.chicago.dom';
						_c.$(e.target).trigger('scrollend', e);
					}
					timer = setTimeout(function() {
						timer = null;
					}, _data.delay);
				};
			_c.$(this).data('chicago.event.scrollend.uid', uid);
			return _c.$(this).on('scroll', _c.utils.debounce(handler, 100)).data(uid, handler);
		},
		teardown: function() {
			var uid = _c.$(this).data('chicago.event.scrollend.uid');
			_c.$(this).off('scroll', _c.$(this).data(uid));
			_c.$(this).removeData(uid);
			return _c.$(this).removeData('chicago.event.scrollend.uid');
		}
	};

	(function() {
		_c.$.event.special.scrollend = _c.events.scrollend;
		_c.$.fn.scrollend = function(options, callback) {
			return this.each(function() {
				_c.$(this).on('scrollend', options, callback);
			});
		};
	})();
});

//anchor adjustment
;(function($){ 'use strict';
	$.anchorAjst_lmtd = function(){
		var fixitems = [$('#browsebar')];
		var getOffset = function(target){
			var itemsHeight = 0;
			$(fixitems).each(function(i,v){
				if($('*').index($(target)) < $('*').index(fixitems[fixitems.length-1])){
					return false;
				}
				itemsHeight += v.outerHeight();
			});
			return itemsHeight;
		};
		if(location.hash){
			(function(){
				var target = location.hash;
				if($('#page').css('min-width') !== '320px' && target !== '#' && $(target).length && fixitems[fixitems.length-1].length && $('*').index($(target)) > $('*').index(fixitems[fixitems.length-1]) ){
					setTimeout(function(){$(window).scrollTop($(target).offset().top - getOffset(target));},100);
				}
			})();
		}
		$(window).on('hashchange', function(e){
			var target = location.hash;
			if($('#page').css('min-width') !== '320px' && target !== '#' && $(target).length && fixitems[fixitems.length-1].length && $('*').index($(target)) > $('*').index(fixitems[fixitems.length-1]) ){
				$(window).one('scrollend', 250, function(){
					$(window).scrollTop($(target).offset().top - getOffset(target));
					$(window).off('scrollend');
				});
			}
		});
		$('a[href^="#"]').each(function(index,element){
			var target = $(this).attr('href');
			if($('#page').css('min-width') !== '320px' && target !== '#' && $(target).length && fixitems[fixitems.length-1].length && $('*').index($(target)) > $('*').index(fixitems[fixitems.length-1]) ){
				$(this).on('click', function(e){
					e.preventDefault();
					$(window).scrollTop($(target).offset().top - getOffset(target));
					if(typeof history.pushState !== 'undefined'){
						history.pushState(null,null,target);
					}
				});
			}
		});
	};
	$(window).on('load',function(){
		if(typeof $.anchorAjst === 'undefined'){
			$.anchorAjst_lmtd();
		}
	});
})(jQuery);


// Bottom Link
function bottomlink() {
	if (!window.FOOTER_MENU_DATA_PARENT) {
		return;
	}
	if (!window.FOOTER_MENU_DATA_CHILD) {
		return;
	}
	var footerArea = document.getElementById('bottomlink');
	if (!footerArea) {
		return;
	}
	var outString = '\n<div class="container">\n'+'<ul id="ga2012_bottomLinkB">';
	for (i in FOOTER_MENU_DATA_PARENT) {
		if (FOOTER_MENU_DATA_CHILD[i]) {
			if (!FOOTER_MENU_DATA_PARENT[i]) {
				continue;
			}
			var parent = FOOTER_MENU_DATA_PARENT[i];
			var child = FOOTER_MENU_DATA_CHILD[i];
			if (!parent.title) {
				continue;
			}
			if (!parent.href) {
				outString += '\n<li class="mainLink"><span>' + parent.title + '</span>';
			}else{
				var targetHtml = '';
				if (parent.target) {
					targetHtml = ' target="_blank"';
				}
				if (!parent.log) {
					parent.log = (i + 1);
				}
				var onClickEventParent = '';
				outString += '\n<li class="mainLink"><a href="' + parent.href + '"' + onClickEventParent + targetHtml + '>' + parent.title + '</a>';
			}
			outString += '\n<ul>';
			for (var i = 0, n = child.length; i < n; i++) {
				if (!child[i].href) {
					continue;
				}
				if (!child[i].title) {
					continue;
				}
				var targetHtml = '';
				if (child[i].target) {
					targetHtml = ' target="_blank"';
				}
				if (!child[i].log) {
					child[i].log = (i + 1);
				}
				var onClickEventChild = '';
				outString += '\n<li><a href="' + child[i].href + '"' + onClickEventChild + targetHtml + '>' + child[i].title + '</a></li>';
			}
			outString += '\n</ul></li>';
		}
	}
	if (window.FOOTER_MENU_DATA_BTN) {
		outString += '\n<li class="staticLink"><ul>';
		for (i in FOOTER_MENU_DATA_BTN) {
			var btn = FOOTER_MENU_DATA_BTN[i];
			if (!btn.href) {
				continue;
			}
			if (!btn.title) {
				continue;
			}
			var targetHtml = '';
			if (btn.target) {
				targetHtml = ' target="_blank"';
			}
			if (!btn.log) {
				btn.log = (i + 1);
			}
			var onClickEventBtn = '';
			outString += '\n<li><a href="' + btn.href + '"' + onClickEventBtn + targetHtml + '>' + btn.title + '</a></li>';
		}
		outString += '\n</ul></li>';
		outString += '\n</ul>\n</div>';
	}
	footerArea.innerHTML = outString;
};
