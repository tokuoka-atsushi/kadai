var globalnaviXml = {};
var globalnavi = {};
var sitesetting = {};
var jsFiles = [];
var subNavigationOption_ext = {};


(function($){
	
	//js loader
	var windowloaded = false;
	$(window).on('load.loaded', function(){
		windowloaded = true;
		$(window).off('load.loaded');
	});
	$.jsLoader = function (_url, _index){
		$.ajax({
			url:_url,
			cache:true,
			dataType:"script"
		}).always(function(){
			if(_index >= jsFiles.length-1){
				setTimeout(function(){
					if(windowloaded) $(window).trigger('load');
				},200);	
			}
		}).then(function(data){
			if(typeof subNavigationOption === 'object' && typeof subNavigationOption_ext === 'object'){
				jQuery(function($){
					var _option = {};
					if(subNavigationOption_ext.active && subNavigationOption_ext.active != ''){
						$(subNavigationOption_ext.active).children('a, span').addClass('active').children('span').not('.icn-inc').replaceWith(function() {
							return '<strong>'+ $(this).html() +'</strong>'
						});
					}else{
						$.extend(_option,{fullopen:true});
					}
					if(subNavigationOption_ext.icnIncAlt){
						$.extend(_option,{icnIncAlt:subNavigationOption_ext.icnIncAlt});
					}
					$('.left-nav-contents-navigation-ext > div > ul').leftNavigation(_option);
				});
			};
		});
	}
	
	
	$(function(){
		$.ajax({
			url : sitesetting.data,
			dataType:'script'
		}).then(function(data){
			//seite setting
			(function(){
				if(typeof siteSetting !== 'undefined'){
					$('html').attr('lang', siteSetting.lang);
					$('#brandlogo a').attr('href', siteSetting.brandlogo.href);
				}
			})();
			//search setting
			(function(){
				if(typeof searchSetting !== 'undefined'){
					var $sitesearch = $('#globalheader .sitesearch-container');
					$sitesearch.empty();
					if(searchSetting.autocomplete){
						$sitesearch.attr('id', 'search-autocomplete');
						$sitesearch.append('<button class="search-autocomplete-label" aria-controls="search-box"><span class="label"" data-close-alt="'+searchSetting.closebtnAlt+'" data-open-alt="'+searchSetting.btnAlt+'"><span>'+searchSetting.label+'</span></span></button><div class="gcse-box"><div class="gcse-box-in"><gcse:searchbox-only enableAutoComplete="true" autoCompleteMaxCompletions="6" resultsUrl="'+searchSetting.action+'" queryParameterName="q"></gcse:searchbox-only></div></div>');
						(function() {
							var cx = searchSetting.cx;
							var gcse = document.createElement('script');
							gcse.type = 'text/javascript';
							gcse.async = true;
							gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
							'//www.google.com/cse/cse.js?cx=' + cx;
							var s = document.getElementsByTagName('script')[0];
							s.parentNode.insertBefore(gcse, s);
						})();
					} else {
						$sitesearch.attr('id', 'search-normal');
						var _html = $('<button class="search-normal-mobile-label" aria-controls="search-box"><span class="label" data-close-alt="'+searchSetting.closebtnAlt+'" data-open-alt="'+searchSetting.btnAlt+'"><span>'+searchSetting.label+'</span></span></button><div class="search-normal-box"><div class="search-normal-box-in"></div></div>');
						_html.find('.search-normal-box-in').append('<form role="search" id="searchformhead" action="'+searchSetting.action+'" method="get"><input type="text" id="s" class="field" name="q" autocomplete="on" value="" placeholder="'+searchSetting.label+'" title="'+searchSetting.title+'"></form>');
						$.each(searchSetting.hidden, function(i,v){
							_html.find('form').append('<input type="hidden" name ="'+v.name+'" value="'+v.value+'">');
						});
						_html.find('form').append('<button type="submit" class="submit"><img src="/etc/designs/panasonic/searchautocomplete-clientlibs/images/icn-search.png" alt="'+searchSetting.btnAlt+'"></button>');
						$sitesearch.append(_html);
					}
				}
			})();
			// footer setting
			(function(){
				if(typeof footerSetting !== 'undefined'){
					var $footerterms = $('#globalfooter-terms');
					$footerterms.empty();
					var _html = $('<div class="container"><p class="copyright">'+footerSetting.copyright+'</p><ul class="links"></ul></div>');
					$.each(footerSetting.termlinks, function(i,v){
						var _target = (v.target !== '') ? ' target="'+v.target+'"' : '';
						_html.find('ul.links').append('<li><a class="'+v.class+'" href="'+v.href+'"'+_target+'>'+v.label+'</a></li>');
					});
					$footerterms.append(_html);
					var $footernav = $('#globalfooter-nav');
					$footernav.empty();
					var _htmlNav = $('<div class="container"></div>');
					_htmlNav.append('<div class="print"><a href="javascript:void(0);" onclick="window.print(); return false">'+footerSetting.footernav.print.label+'</a></div>');
					_htmlNav.append('<div class="pagetop"><a href="#">'+footerSetting.footernav.pagetop.label+'</a></div>');
					_htmlNav.append('<div class="links"><ul></ul></div>');
					$.each(footerSetting.footernav.links, function(i,v){
						_htmlNav.find('.links ul').append('<li><a class="'+v.class+'" data-content="'+v.data+'" href="'+v.href+'" target="'+v.target+'">'+v.label+'</a></li>');
					});
					$footernav.append(_htmlNav);
					if(typeof footerSetting.sociallinks !== 'undefined' && footerSetting.sociallinks.length){
						$footerterms.after('<div id="globalfooter-socialmedia"><div class="container"><ul></ul></div></div>');
						$.each(footerSetting.sociallinks, function(i,v){
							$('#globalfooter-socialmedia ul').append('<li><a href="'+v.href+'" target="'+v.target+'"><img src="'+v.icn+'" alt="'+v.label+'"></a></li>');
						});
					}
				}
			})();
			return $.ajax({
				url: globalnavi.data,
				dataType:"script"
			});
		},function(){
			return $.ajax({
				url: globalnavi.data,
				dataType:"script"
			});
		}).then(function(data){
			//mainNavLink
			var mainnavlable =(typeof NAVI_LABEL !== 'undefined' && typeof NAVI_LABEL.mainnav !== 'undefined') ? NAVI_LABEL.mainnav : '';
			var relnavlable =(typeof NAVI_LABEL !== 'undefined' && typeof NAVI_LABEL.relnav !== 'undefined') ? NAVI_LABEL.relnav : '';
			if(typeof NAVI_MAIN_LINK != 'undefined'){
				(function(){
					var _mainNav = $('#globalheader-nav');
					_mainNav.empty();
					_mainNav.append('<nav aria-label="'+ mainnavlable +'"><ul class="main_menu"></ul><div class="consumerpanel__placeholder"></div><div class="megapannel-placeholder"></div></nav>');
					$(NAVI_MAIN_LINK).each(function(index, element) {
						var _target = (element.target != '')? element.target : '_self';
						var dataPanelnavId = (typeof  element.panelId == 'string' && element.panelId != '')? ' data-panelnav-id="'+ element.panelId +'" aria-controls="'+ element.panelId +'"' : '' ;
						var $li = $('<li class="main-nav-root"><div class="main-nav-root__title"><a id="'+element.id+'" class="'+element.classes+'" href="'+element.href+'" target="'+_target+'"'+dataPanelnavId+'>'+element.title+'</a></div></li>');
						
						if(typeof element.panelData == 'object' && typeof NAVI_MENU_DATA_V20101 !== 'undefined'){
							$li.find('a').eq(0).addClass('link-consumerpanel');
							setNavpanel_v20101($li,element.panelData);
						}
						_mainNav.find('.main_menu').append($li);
					});
				})();
			}
			
			//secondaryNavLink
			if(typeof NAVI_SECONDARY_LINK != 'undefined'){
				(function(){
					var _secondaryNav = $('#globalheader-secondarynav');
					_secondaryNav.empty();
					_secondaryNav.append('<nav aria-label="'+ relnavlable +'"><ul class="main"></ul></nav>');
					$(NAVI_SECONDARY_LINK).each(function(index, element) {
						var _html = '';
						var _target = (element.target != '')? element.target : '_self';
						var _type = '';
						if(element.listType && element.listType !='') _type = 'withlistmenu';
						if(element.langs && element.langs !='') _type = 'withmodalmenu';
						_html += '<li class="'+_type+'"><a id="'+element.id+'" class="'+element.classes+'" href="'+element.href+'" target="'+_target+'" style="text-transform:none;">'+element.title+'</a>';
						if(element.listmenu && element.listType){
							_html += '<div class="listmenu '+ element.listType +'">';
							$.each(element.listmenu, function(i, val){
								if(i == 0) _html += '<ul>';
								if(element.listType=='col2' && i == Math.ceil(element.listmenu.length/2)) _html += '<\/ul><ul>';
								if(element.listType=='col3' && (i == Math.ceil(element.listmenu.length/3) || i == Math.ceil(element.listmenu.length/3)*2)) _html += '<\/ul><ul>';
								_html += '<li><a href="'+ val.href +'" target="'+ ((val.target!=='') ? val.taget : '_self') +'">'+ val.title +'</a></li>';
								if(i == element.listmenu.length -1) _html += '</ul>';
							});
							_html += '</div>';
						}
						if(element.langs){
							_html += '<div class="modalmenu"><dl>';
							_html += '<dt>'+element.langs.title+'</dt>';
							$.each(element.langs.list, function(i, val){
								var _target = (val.target != '')? val.target : '_self';
								_html += '<dd><a href="'+val.href+'" target="'+_target+'">'+val.title+'</a></dd>';
							});
							_html += '</dl>'
							_html += '<p class="notes">'+element.langs.notes+'</p>'
							_html += '</div>';
						}
						_html += '</li>'
						_secondaryNav.find('.main').append(_html);
					});
				})();
			}
			
			//products category menu
			if(typeof NAVI_MENU_DATA != 'undefined'){
				(function(){
					var productsAllLink = (NAVI_ALL_LINK.href)? NAVI_ALL_LINK.href : $('.link-products').prop('href');
					var productsAllText = (NAVI_ALL_LINK.title)? NAVI_ALL_LINK.title : $('.link-products').text();
					var containerWrapper = $('#navmenucat');
					containerWrapper.empty();
					containerWrapper.append(
							'<div class="hide">'+
								'<div class="liquid-slider" id="navmenucats">'+
									'<div class="inpannel">'+
										'<div class="panhead">'+
											'<div class="container">'+
												'<p class="inbread"><span>'+productsAllText+'</span></p>'+
												'<p class="closeit"><a class="btn-slide" href="javascript:void(0);"><img src="/etc/designs/panasonic/common-clientlibs/images/icn-close.gif" width="9" height="9" alt="Close"></a></p>'+
											'</div>'+
										'</div>'+
										'<div class="parrays"><ul></ul>'+
										'</div>'+
										'<div class="panfoot">'+
											'<div class="container">'+
												'<p class="browseall"><a href="'+productsAllLink+'">'+productsAllText+'</a></p>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>');
					var container = containerWrapper.find('.parrays');
					var parrays = container.find('.parrays > ul').eq(0);
					function addItem(_container, _element){
						_container.append('<div class="parbase"></div>')
						var titleAr = _element.title.split('<br>');
						var title = (titleAr.length>1)? titleAr[0] + String.fromCharCode(60) + 'br' + String.fromCharCode(62) + titleAr[1] : _element.title;
						var href = _element.href;
						var src = _element.image;
						var htmldata = '';
						if(src){
							htmldata += '<a href="'+href+'" title="'+title+'">'+'<div class="img-element"><img title="'+title+'" alt="'+title+'" src="'+src+'"/> </div><span class="catname">'+title+'</span></a>';
						}else if(_element.textdata){
							htmldata += '<div class="text-element">';
							$(_element.textdata).each(function(i, v) {
								htmldata += '<span><a href="'+v.href+'" title="'+v.title+'">'+v.title+'</a></span>'
							});
							htmldata +='</div><a href="'+href+'"><span>'+title+'</span></a>'
						}
						_container.children('.parbase').append(htmldata);
						if(_element.children.length){
							$(_container).append('<ul></ul>');
							var childUl = $(_container).children('ul');
							$(_element.children).each(function(index, element) {
								childUl.append('<li></li>');
								addItem(childUl.children('li').eq(index), this);
							});
						}
					}
					if( typeof NAVI_MENU_DATA != "undefined" ){
						var parraysUl = container.children('ul').eq(0);
						$(NAVI_MENU_DATA).each(function(index, element) {
							container.children('ul').append('<li></li>');
							addItem(container.children('ul').children('li').eq(index), this);
						});
					}
				})();
			}
			
			//products category menu (Mega menu)
			if(typeof NAVI_MENU_DATA_MEGA != 'undefined'){
				(function(){
					//$('#navmenucat').addClass('megapannel-container').append('<div class="hide"></div>');
					function addItem(_container, _element){
							_container.append('<div class="parbase"></div>')
							var titleAr = _element.title.split('<br>');
							var title = (titleAr.length>1)? titleAr[0] + String.fromCharCode(60) + 'br' + String.fromCharCode(62) + titleAr[1] : _element.title;
							var href = _element.href;
							var src = _element.image;
							var target = (_element.target !='') ? _element.target : '_self';
							var htmldata = '';
							if(src){
								htmldata += '<a href="'+href+'" target="'+target+'">'+'<div class="img-element"><img alt="'+title+'" src="'+src+'"/> </div><span class="catname">'+title+'</span></a>';
							}else if(_element.textdata){
								htmldata += '<div class="text-element">';
								$(_element.textdata).each(function(i, v) {
									htmldata += '<span><a href="'+v.href+'">'+v.title+'</a></span>';
								});
								htmldata +='</div><a href="'+href+'"><span>'+title+'</span></a>';
							}
							_container.children('.parbase').append(htmldata);
							if(typeof _element.children.data != 'undefined' && _element.children.data.length){
								if(_element.children.type == 'visual'){
									$(_container).append('<ul></ul>');
									var childUl = $(_container).children('ul');
									$(_element.children.data).each(function(index, element) {
										childUl.append('<li></li>');
										addItem(childUl.children('li').eq(index), this);
									});
								}else{
									$(_container).append('<div class="wrapper-noimage"><div class="noimage-container"><div class="parbase"></div></div>');
									var childDiv = $(_container).find('.wrapper-noimage .parbase');
									$(_element.children.data).each(function(index, element) {
										childDiv.append('<div class="column-3"></div>');
										addItemText(childDiv.children('.column-3').eq(index), this);
									});
								}
							}
						}
					function addItemText(_container, _element){
							_container.append('<ul></ul>');
							$(_element).each(function(index, element) {
								var titleAr = this.title.split('<br>');
								var title = (titleAr.length>1)? titleAr[0] + String.fromCharCode(60) + 'br' + String.fromCharCode(62) + titleAr[1] : this.title;
								var target = (typeof this.target != 'undefined' && this.target !='') ? this.target : '_self';
								var htmlData;
								if(typeof this.href != 'undefined' && this.href != ''){
									htmlData = '<li><a href="'+this.href+'" target="'+target+'">'+title+'</a></li>';
								} else {
									htmlData = '<li><span>'+title+'</span></li>';
								}
								_container.children('ul').append(htmlData);
								if(typeof this.children != 'undefined' && this.children.length){
									addItemText(_container.children('ul').children('li').eq(index), this.children);
								}
							});
						}
					$.each( NAVI_MENU_DATA_MEGA, function(){
						var AllLink = (typeof this.allLink.href == 'string' && this.allLink.href !='' && typeof this.allLink.title == 'string' && this.allLink.title !='') ? '<a href="'+this.allLink.href+'">'+this.allLink.title+'</a>' : '';
						var $maninavroot = $('#globalheader-nav').find('.main_menu').find('a[data-panelnav-id="'+this.panelId+'"]').closest('.main-nav-root');
						$maninavroot.append('<div class="megapannel-wrapper"><div class="megapannel-container"><div class="megapannel-bg"><div class="megapannel-bg-in"></div></div></div></div>');
						var containerWrapper = $maninavroot.find('.megapannel-container');
						containerWrapper.append(
							'<div id="'+ this.panelId +'" class="megapannel">'+
								'<div class="inpannel">'+
									'<div class="panhead">'+
										'<div class="container">'+
											'<p class="inbread"><span></span></p>'+
											'<p class="closeit"><a class="btn-slide" href="javascript:void(0);"><img src="/etc/designs/panasonic/common-clientlibs/images/icn-close.gif" width="9" height="9" alt="Close"></a></p>'+
										'</div>'+
									'</div>'+
									'<div class="parrays">'+
									'</div>'+
									'<div class="panfoot">'+
										'<div class="container">'+
											'<p class="browseall">'+AllLink+'</p>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>');
						var container = $('#' + this.panelId).find('.parrays');
						if( typeof this.panel != "undefined" ){
							if(this.panel.type == 'visual'){
								container.append('<ul></ull>');
								$(this.panel.data).each(function(index, element) {
									container.children('ul').append('<li></li>');
									addItem(container.children('ul').children('li').eq(index), this);
								});
							}else{
								container.append('<div class="wrapper-noimage"><div class="noimage-container"><div class="parbase"></div></div>');
								var childDiv = container.find('.wrapper-noimage .parbase');
								$(this.panel.data).each(function(index, element) {
									childDiv.append('<div class="column-3"></div>');
									addItemText(childDiv.children('.column-3').eq(index), this);
								});
							}
						}
					});
				})();
			}
			
			//products category menu mobile
			if(typeof NAVI_MENU_DATA_MOBILE != 'undefined'){
				(function(){
					var $mobnav = $('#mobile-navigation'),
						containerWrapper;
					$mobnav.empty();
					if($mobnav.hasClass('inc_consumerpanelmob')){
						$mobnav.append('<button class="toggleMenu" aria-controls="navmenumob"><span class="label"><span>'+mainnavlable+'</span></span></button><nav class="navmenumob addconsumeroption" role="navigation" aria-label="'+mainnavlable+'" id="navmenumob"></nav>');
						containerWrapper = $mobnav.find('.navmenumob');
						containerWrapper.append('<ul class="accordion navmenumob__l1"></ul>');
					} else {
						$('#mobile-navigation').append('<button class="toggleMenu" aria-controls="nav-menu-mob"><span class="label"><span>'+mainnavlable+'</span></span></button><nav id="nav-menu-mob" role="navigation" aria-label="'+mainnavlable+'"></nav>');
						containerWrapper = $('#nav-menu-mob');
						containerWrapper.append('<ul class="accordion typeTall"></ul>');
						
					}
					var container = containerWrapper.children('.accordion');
					$(NAVI_MENU_DATA_MOBILE).each(function(index, element) {
						container.append('<li></li>');
						addItem(container.children('li').eq(index), this);
					});
					function addItem(_container, _element){
						var titleAr = _element.title.split('<br>');
						var title = (titleAr.length>1)? titleAr[0] + titleAr[1] : _element.title;
						var href = (_element.href && _element.href != '')? _element.href : 'javascript:void(0);';
						var src = (typeof _element.image !=='undefined' && _element.image !== '') ? _element.image : false;
						var classes = _element.classes;
						var target = (typeof _element.target != 'undefined' && _element.target !='') ? _element.target : '_self';
						var htmldata = '';
						var level = (function(){
							var len = _container.parents('.accordion').length;
							return len;
						})();
						if($mobnav.hasClass('inc_consumerpanelmob')){
							_container.addClass('navmenumob__listitem').closest('ul').addClass('navmenumob__l' + level);
						}
						if(src){
							_container.closest('ul').addClass('withImage');
							htmldata += '<a href="'+href+'" class="'+classes+'" target="'+target+'"><span class="itembox"><span class="img-element"><img src="'+src+'" alt=""></span><span class="catname">'+title+'</span></span></a>';
						}else if(_element.textdata){
							htmldata += '<a href="'+href+'" class="'+classes+'" target="'+target+'"><span class="itembox"><span class="catname">'+title+'</span></span></a>';
							htmldata += '<ul class="accordion">';
							$(_element.textdata).each(function(i, v) {
								htmldata += '<li><a href="'+v.href+'" class="'+classes+'"><span class="itembox"><span class="catname">'+v.title+'</span></span></a></li>'
							});
							htmldata +='</ul>'
						}else{
							htmldata += '<a href="'+href+'" class="'+classes+'" target="'+target+'"><span class="itembox"><span class="catname">'+title+'</span></span></a>';
						}
						_container.append(htmldata);
						if(_element.children){
							if(_element.children.length){
								if($mobnav.hasClass('inc_consumerpanelmob')){
									_container.append('<div class="accordion"><ul></ul></div>');
								} else {
									_container.append('<ul class="accordion"></ul>');
								}
								var childUl = _container.find('ul').eq(0);
								$(_element.children).each(function(index, element) {
									childUl.append('<li></li>');
									addItem(childUl.children('li').eq(index), this);
								});
							}
						}
						if(_element.learnabout && _element.learnabout.length){
							if(!_container.has('.accordion')){
								_container.append('<div class="accordion" />');
							}
							var $learnabout = $('<div class="consumerpanelmob__learnabout"><ul class="consumerpanelmob__learnabout__list"></ul></div>');
							$.each(_element.learnabout, function(i,v){
								var target = (v.target && v.target !== '') ? ' taget="'+v.target+'"' : '';
								$learnabout.find('.consumerpanelmob__learnabout__list').append('<li class="consumerpanelmob__learnabout__item"><a href="'+v.href+'"'+target+'><span class="consumerpanelmob__learnabout__img"><img src="'+v.image+'" alt=""></span><span class="consumerpanelmob__learnabout__name">'+v.title+'</span></a></li>');
							});
							_container.children('.accordion').prepend($learnabout);
						}
						if(_element.banner && _element.banner.length){
							if(!_container.has('.accordion')){
								_container.append('<div class="accordion" />');
							}
							var $banner =$('<div class="consumerpanelmob__banner"><div class="consumerpanelmob__banner__container"><ul class="consumerpanelmob__banner__list"></ul></div></div>');
							$.each(_element.banner, function(i,v){
								var target = (v.target && v.target !== '') ? ' taget="'+v.target+'"' : '';
								$banner.find('.consumerpanelmob__banner__list').append('<li class="consumerpanelmob__banner__item"><a href="'+v.href+'"'+target+'><span class="consumerpanelmob__banner__img"><img src="'+v.image+'" alt=""/></span><span class="consumerpanelmob__banner__text"><span>'+v.title+'</span></span></a></li>');
							});
							_container.children('.accordion').append($banner);
						}
					}
				})();
			}
		}).always(function(){
			$.each(jsFiles, function(index,value){
				$.jsLoader(value, index);
			});
		});
	});
	function setNavpanel_v20101(_item, _paneldata){
		var $wrapper = $(
			'<div class="consumerpanel__wrapper">\
				<div class="consumerpanel__bg"><div class="class="consumerpanel-bg__in""></div></div>\
				<div id="'+_item.find('a').eq(0).data('panelnav-id')+'" class="consumerpanel" aria-hidden="true"><div class="consumerpanel__inpanel">\
					<div class="consumerpanel__products">\
						<div class="consumerpanel__panhead"><div class="consumerpanel__panhead__container"><div class="intitle" tabindex="0"><span>'+_item.children('.main-nav-root__title').text()+'</span></div><div class="browseall"><a href="'+ _paneldata.allLink.href+'"><span class="browseall__icn"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"  x="0px" y="0px" width="11px" height="11px" viewBox="0 0 11 11" style="enable-background:new 0 0 11 11;" xml:space="preserve"><rect y="0" class="st0" width="5" height="5"/><rect x="6" class="st0" width="5" height="5"/><rect y="6" class="st0" width="5" height="5"/><rect x="6" y="6" class="st0" width="5" height="5"/></svg></span><span class="browseall__text">'+ _paneldata.allLink.title+'</span></a></div><div class="closeit"><a class="btn-slide" href="javascript:void(0);"><img src="/etc/designs/panasonic/common-clientlibs/images/icn-close.gif" width="9" height="9" alt="">'+_paneldata.allLink.closetext+'</a></div></div></div>\
						<div class="parrays"><div class="consumerpanel__products__contents"></div></div>\
					</div>\
				</div></div>\
			</div>'),
			$panelproducts = $wrapper.find('.consumerpanel__products'),
			$ul_wImg = $('<ul class="consumerpanel__products__list" />'),
			$textpanel = function(_data){
				var $tpnl = $('<div class="consumerpanel__products__textpanel"><ul class="consumerpanel__products__textpanel__list"></ul></div>');
				$.each(_data, function(i,v){
					var children = '';
					var link = (v.href !== '') ? ' href="'+v.href+'"' : ' class="nolink" role="presentation"';
					if(typeof v.children.data === 'object' && v.children.data.length){
						children = $textpanelChild(v.children.data);
					}
					$tpnl.find('.consumerpanel__products__textpanel__list').append('<li class="consumerpanel__products__textpanel__item"><div class="consumerpanel__products__textpanel__item__in"><a'+link+'><span class="listname listname-parent">'+v.title+'</span></a></div>'+children+'</li>');
				});
				return $('<div />').append($tpnl).html();
			},
			$textpanelChild = function(_data){
				var $child_ul = $('<ul class="consumerpanel__products__textpanel__child"></ul>');
				$.each(_data, function(i,v){
					var link = (v.href !== '') ? ' href="'+v.href+'"' : ' class="nolink" role="presentation"';
					$child_ul.append('<li class="consumerpanel__products__textpanel__child__item"><a'+link+'><span class="listname listname-child">'+v.title+'</span></a></li>');
				});
				return $('<div />').append($child_ul).html();
			},
			$banner = $('<div class="consumerpanel__banner"><div class="consumerpanel__banner__container"><ul class="consumerpanel__banner__list"></ul></div></div>');
		if(_paneldata.panel.type === 'visual'){
			$.each(_paneldata.panel.data, function(i, v){
				var children = '';
				if(typeof v.children.learnabout === 'object' || typeof v.children.data === 'object'){
					children += '<div class="consumerpanel__products__list-child__wrapper consumerpanel__products__bg-light">';
					if(typeof v.children.learnabout === 'object' && v.children.learnabout.length){
						children += '<div class="consumerpanel__learnabout"><ul class="consumerpanel__learnabout__list" data-alt-prev="Prev" data-alt-next="Next" data-move="1">';
						$.each(v.children.learnabout, function(i,v){
							var target = (v.target && v.target !== '') ? ' target="'+v.target+'"' : '';
							children += '<li class="consumerpanel__learnabout__item"><a href="'+v.href+'"'+target+'><span class="consumerpanel__learnabout__img"><img src="'+v.image+'" alt=""></span><span class="consumerpanel__learnabout__name">'+v.title+'</span></a></li>';
						});
						children += '</ul></div>';
					}
					if(typeof v.children.data === 'object' && v.children.data.length){
						children += $textpanel(v.children.data);
					}
					children += '</div>'
				}
				$ul_wImg.append('<li class="consumerpanel__products__item"><div class="parbase"><a href="'+v.href+'" class="incimg"><span class="img-element"><img alt="" src="'+v.image+'"></span><span class="catname">'+v.title+'</span></a></div>'+children+'</li>');
			});
			$panelproducts.find('.consumerpanel__products__contents').append($ul_wImg);
		} else {
			$panelproducts.find('.consumerpanel__products__contents').append('<div class="consumerpanel__products__bg-light">'+$textpanel(_paneldata.panel.data)+'</div>');	
		}
		if(_paneldata.banner){
			$.each(_paneldata.banner, function(i,v){
				var target = (v.target && v.target !== '') ? ' target="'+v.target+'"' : '';
				$banner.find('.consumerpanel__banner__list').append('<li class="consumerpanel__banner__item"><a href="'+v.href+'"'+target+'><span class="consumerpanel__banner__img"><img src="'+v.image+'" alt=""/></span><span class="consumerpanel__banner__text">'+v.title+'</span></a></li>');
			});
			$panelproducts.after($banner);
		}
		_item.children('.main-nav-root__title').after($wrapper);
	}
})(jQuery);



function renderBottomlink(_url){
	jQuery.ajax({
		url:_url,
		dataType:"script",
		cache: true,
		success: function(data){
			tryBottomlink();
			function tryBottomlink(){
				var _timerId = setTimeout(function(){},0);
				if(typeof bottomlink == "function"){
					bottomlink();
					clearTimeout(_timerId);
				}else{
					_timerId = setTimeout(function(){
						tryBottomlink();
					},100);
				}
			}
		}
	});
}

function announcementsBridge(_params){
	jQuery(window).on('load', function(e){
		tryAnnouncements();
		function tryAnnouncements(){
			var _timerId = setTimeout(function(){},0);
			if(typeof AnnouncementsUtil != 'undefined' && typeof renderAnnoucements == 'function'){
				AnnouncementsUtil.render(_params);
				clearTimeout(_timerId);
			}else{
				_timerId = setTimeout(function(){
					tryAnnouncements();
				},100);
			}
		}
	});
}
