mui.init();

function call() {
	mui('#sheet1').popover('toggle');
}

mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' }); //去除滚动条
	mui(".mui-table-view").on('tap', '#paymentInfo', function() {

		mui.openWindow({
			url: '../store/store-paymentPage.html',
			id: 'store-paymentPage'
		})
	});

	var mineLocation = document.getElementById('mineLocation');
	mineLocation.addEventListener('tap', function() {
		mui.toast("打开地图页面");
		mui.openWindow({
			url: '../map/storeMap.html',
			id: 'storeMap'
		})
	});
});