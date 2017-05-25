define(['./mui' ,'./template-native', './xrjapi', './bluebird.core'], function(mui, artTemplate, xrjApi, Promise){


	var myUtil = {};

	//使用arttemplate生成html
	 function generateFromTempl(tplFun, data){
		var comments = new String(tplFun);
		var templ = comments.substring(comments.indexOf('/*') + 2, comments.lastIndexOf('*/'));
		var render = artTemplate.compile(templ);
		return render({list:data});
	}

	//下载图片文件到本地
	myUtil.downloadImage = function (imgUrl) {
		return xrjApi.downloadFile(imgUrl)
			.then(function (download) {
				return plus.io.convertLocalFileSystemURL(download.filename);
			})
	};



    //funToRun必须返回一个promise
    myUtil.waitingRun = function (funToRun) {
        plus.nativeUI.showWaiting('正在加载数据...');
		Promise.try(funToRun)
			.finally(function () {
				plus.nativeUI.closeWaiting();
			});

    };


	//自定义弹出页面
/*	myUtil.popup = function (url, top) {
		var rootWebView = plus.webview.getTopWebview();
		var mask = {mask:'rgba(0,0,0,0.5)'};
		rootWebView.setStyle(mask);
		var styles = {top:top};
		var popupWebView = plus.webview.open(url,url,styles);
	}*/

    
    myUtil.popup = function (url, top, extras) {
        var rootWebview = plus.webview.getTopWebview();
        var mask = {mask:'rgba(0,0,0,0.5)'};
        rootWebview.setStyle(mask);
        extras.maskWebviewId = rootWebview.id;
        var styles = {top:top};
        var popupWebView = mui.openWindow({
            url : url,
            id : url,
            styles : styles,
            extras : extras,
            show: {aniShow : 'none'},
            waiting:{autoShow:false}
        });
        rootWebview.addEventListener("maskClick",function(){
            plus.webview.close(popupWebView);
            rootWebview.setStyle({mask:"none"});
        },false);
    }


    //商家类型栏
	myUtil.categoryView = function (data) {
		var templFunc = function () {
			/*
			 <ul id="functionTenUL" class="mui-table-view mui-grid-view mui-grid-9">
			 <%
			 for(var i = 0; i < list.length; i++){
			 var current = list[i];
			 %>
			 <li class="mui-table-view-cell mui-media  mui-col-xs-3 mui-col-sm-2">
			 <a id="<%=current.id%>">
			 <span>
			 <img src="<%=current.localPreviewImage%>"/>
			 </span>
			 <div class="mui-media-body"><%=current.categoryName%></div>
			 </a>
			 </li>
			 <%}%>
			 </ul>
			 */
		};
		return generateFromTempl(templFunc, data);
	};

    //商家列表栏
    myUtil.mechantListView = function (data) {
        var templFunc = function () {
            /*
             <ul  class="mui-table-view">
             <%
             var length = list.length;
             for(var i = 0; i < length; i++){
             var current = list[i];
             %>
             <li class="mui-table-view-cell mui-media merchant-item" id="<%=current.id%>">
             <a href="javascript:;">
             <img class=" mui-pull-left merchant-thumbnail" src="<%=current.previewImage%>">
             <div class="mui-media-body">
             <div class="merchant-name">
             <%=current.merchantName%>
             </div>
             <div class="merchant-score">
             <span>
             <img src="../../img/icon/stars5_full.png" style="width: <%= current.percentScore %>"/>
             </span>
             </div>
             <div class="merchant-brief">
             <p class=" mui-pull-left"><%=current.categoryName%></p>
             <p class=" mui-pull-right"> <%=current.distanceRange%> </p>
             </div>
             <div class="gap"></div>
             <div id="" class="mui-pull-left merchant-cashback">返利:&nbsp&nbsp<%=current.percentCashRatio%></div>
             </div>
             </a>
             </li>
             <%}%>
             </ul>
             */
        }
        return generateFromTempl(templFunc, data);
    }


    

	return myUtil;
});
