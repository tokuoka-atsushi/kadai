//Site
var siteSetting = {
	lang : 'ja',
	brandlogo : {
		href : 'https://www.panasonic.com/jp/home.html'
	}
}
//Search
var searchSetting = {
	autocomplete : false,
	cx : '',
	action : 'https://www.panasonic.com/jp/search.html',
	label : '検索キーワード',
	title : 'サイト内検索',
	hidden : [
		{ name : 'mode', value: 'all' },
		{ name : 'ie', value: 'UTF-8' }
	],
	btnAlt : 'Search',
	closebtnAlt : 'Close'
};

//Footer
var footerSetting = {
	copyright : '© Panasonic XXXXXXXXXXXXXXXXXXXX',
	footernav : {
		print : {
			label : '印刷'
		},
		pagetop : {
			label : 'ページの先頭へ'
		},
		links : [
			{
				label : 'Area / Country',
				href : 'https://www.panasonic.com/global/global-network.html',
				target : '',
				data : '',
				class : ''
			}
		]
	},
	termlinks : [
		{
			label : 'サイトマップ',
			href : 'https://www.panasonic.com/jp/sitemap.html',
			target : '',
			class : 'footer-link'
		},
		{
			label : 'サイトのご利用にあたって',
			href : 'https://www.panasonic.com/jp/terms-of-use.html',
			target : '',
			class : 'footer-link'
		},
		{
			label : 'ウェブアクセシビリティ方針',
			href : 'https://www.panasonic.com/jp/webaccessibility.html',
			target : '',
			class : 'footer-link'
		},
		{
			label : '個人情報保護方針',
			href : 'https://www.panasonic.com/jp/privacy-policy.html',
			target : '',
			class : 'footer-link'
		},
		{
			label : 'パナソニック・ホーム',
			href : 'https://www.panasonic.com/jp/home.html',
			target : '',
			class : 'footer-link'
		}
	]
};