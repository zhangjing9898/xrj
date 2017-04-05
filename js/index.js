require.config({
	shim: {
		'lib/mui': {
			exports: 'mui'
		}
	}
});


require(['./lib/mui', './lib/xrjapi', './lib/tplgen'], function(mui, xrjApi, tplGen) {
	var subpages = ['home/home.html', 'store/store.html', 'mine/mine.html', 'other/other.html'];

	mui.init({
		beforeback: function() {
			return false; //return false时不再执行后退逻辑
		}
	});
	
	function preloadSubPage(url) {
		var subpage_styles = {
			top: '0px',
			/*设置距离顶部的距离*/
			bottom: '50px'
		};
		var subpage_extra = {};
		return mui.preload({
			url: url,
			id: url,
			styles: subpage_styles,
			extras: subpage_extra
		});
	}
	
	/*设置默认打开首页显示的子页序号*/
	const InitTabIndex = 0;
	
	
	/*当前激活选项*/
	var activeTab = subpages[InitTabIndex];
	//title = document.querySelector(".mui-title");
	var targetWebView = preloadSubPage(activeTab);
	plus.webview.show(targetWebView);
	/*选项卡点击事件*/
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		/*获取目标子页的id*/
		var targetTab = this.getAttribute('href');
		if(activeTab == targetTab) return; //如果点击当前页,则什么也不做

		/*处理当前选项卡*/
		var activeImg = document.querySelector('a.mui-active img');
		activeImg.src = activeImg.src.replace('-filled.png', '.png');
		plus.webview.hide(activeTab);

		/*处理目标选项卡*/
		targetWebView = plus.webview.getWebviewById(targetTab); 
		if(!targetWebView){
			targetWebView = preloadSubPage(targetTab);
		}
		plus.webview.show(targetWebView);
		var targetImg = this.querySelector('img');
		targetImg.src = targetImg.src.replace('.png', '-filled.png');
		//plus.webview.show(targetTab);
		/*改变当前活跃的选项卡*/
		activeTab = targetTab;
	});

});