require.config({
	baseUrl:'../../js',
	shim:{
		'lib/mui':{
			exports:'mui'
		}
	}
});



require(['lib/mui', 'lib/xrjapi', 'lib/tplgen', 'ext/localbuffer'], function(mui, xrjApi, tplGen, localBuffer){
	mui.init();
	mui.plusReady(function(){
		mui('.mui-scroll-wrapper').scroll();
		plus.nativeUI.showWaiting('正在加载数据...');
		xrjApi.getCategories()
			.then(function(data){
				updateCategoryView(data);
			})
			.catch(function(err){
				mui.toast(err);
			})
			.finally(function(){
				plus.nativeUI.closeWaiting();
			})
	});
	
	//支撑函数
	function fillCategoryView(){
		
		
	}
	
	
	function updateCategoryView(data) {
		if(oldCategories) {
			
		} else {
		
		}
	}
})
