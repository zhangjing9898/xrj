/**
 * Created by lee on 2017/4/10.
 */
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

require(['lib/mui', 'lib/myUtil', 'model/categories'], function(mui, myUtil, categoryModel){



    mui.init();

    function closeMe(maskWebviewId) {
        if(maskWebviewId) {
            var webview = plus.webview.getWebviewById(maskWebviewId);
            webview.setStyle({mask:'none'});
        }
        mui.back();
    }
    
    mui.plusReady(function () {
        var currentWebview = plus.webview.currentWebview();
        var selected = currentWebview.selected;
        var maskWebviewId = currentWebview.maskWebviewId;
        console.log(selected);
        var categories = categoryModel.getLocal();

        document.querySelector('html').addEventListener('tap', function (ev) {
            console.log(ev);
            ev.stopPropagation();
            console.log(ev.target);
            if(ev.target == mui('html')[0])
                closeMe(maskWebviewId);
        })
    })

})
