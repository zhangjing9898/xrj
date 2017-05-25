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
        mui('.mui-scroll-wrapper').scroll();
        //plus.nativeUI.showWaiting('正在加载数据...');

        myUtil.waitingRun(function () {
            //更新商家列表
            return merchantModel.searchList()
                .then(function (data) {
                    updateMerchantListView(data);
                })
                .catch(function (error) {
                    mui.toast(error);
                });
        });


        

    });



    function updateMerchantListView(data) {
      //  console.log(data);
        var view = document.querySelector('#storeList');
        view.innerHTML = myUtil.mechantListView(data);
    }


})
