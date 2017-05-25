require.config({
	baseUrl:'../../js',
	shim:{
		'lib/mui':{
			exports:'mui'
		}
	}
});



require(['lib/mui','lib/myUtil',  'model/merchant', 'model/categories'], function(mui, myUtil, merchantModel, categoryModel){

	mui.init();
	mui.plusReady(function(){
		//plus.nativeUI.showWaiting('正在加载数据...');


        myUtil.waitingRun(function () {
            //更新分类导航栏
            return categoryModel.refreshCategory(plus)
                .then(function (data) {
                    updateCategoryView(data);

                    //更新猜你喜欢列表
                     return merchantModel.favoriteList()
                     .then(function (data) {
                        updateFavoriteView(data);
                     })
                })
                .catch(function(err){
                    var data = categoryModel.getLocal();
                    if(!data)
                        mui.toast(err);
                    else
                        updateCategoryView(data);
                });
        });

        mui('.mui-scroll-wrapper').scroll();


        
	});


    /*
     //支撑函数
     */
    //更新猜你喜欢区域
    function updateFavoriteView(data) {
     //   console.log(data);
        var view = document.querySelector('#guessContent');
        view.innerHTML = myUtil.mechantListView(data);
    }


    //更新分类区域
	function updateCategoryView(data){
      //  console.log(data);
		var categoryView = document.querySelector('#functionTen');
		categoryView.innerHTML = myUtil.categoryView(data);
	}

})
