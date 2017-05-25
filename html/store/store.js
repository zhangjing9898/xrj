/**
 * Created by lee on 2017/4/9.
 */
require.config({
    baseUrl:'../../js',
    shim:{
        'lib/mui':{
            exports:'mui'
        }
    }
});

require(['lib/mui', 'lib/myUtil','model/categories'], function(mui, myUtil, categoryModel){
    var url = 'storeList.html';
    var categories = categoryModel.getLocal();
    mui.init({
        subpages:[{
            url:url,
            id:url,
            styles:{
                top:'92px',
                bottom:'0px'
            }

        }],
        beforeback:function () {
            return false;
        }
    });

    mui('#nav').on('tap', 'li', function (li) {
        var id = this.getAttribute('id');
        var extras = {
            selected : id
        }
        myUtil.popup('store-categories.html','54px', extras);
    })



})
