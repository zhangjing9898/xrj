define(['./authApi', './MD5Encrypt','./aesUtil','./bluebird.core'], function(AuthApi, encryptor,AESUtil,Promise){

	
	/**
	 *	以下为相关的常量和函数 
	 */
	const APPID = 'b3ef92e1b5a24a5da2625e62ccb85929';
	const APPKEY = '91c490ee1429cead';
	const APIENTRY = 'https://www.91xrj.com/xrj-api/v1';




    var authApi = new AuthApi(APPID, APPKEY, encryptor);
	var aesUtil = new AESUtil(APPKEY);

	

	/**
	 * 以下为接口
	 */
	
	var xrjApi = {};
	
	/**
	 * @description 测试接口
	 * @param {String} hello
	 */
	xrjApi.demo = function(hello){
		var url = APIENTRY + '/demo';
		return authApi.getAsync(url,{args:hello});
	}
	
	/**
	 * @description 上报设备
	 * @param {Object} params
	 */
	xrjApi.reportDevice = function(params){
		var url = APIENTRY + '/device';
		return authApi.postAsync(url, params);
	}
	
	
	/**
	 * @description 新增资源
	 * @param 
	 * 
	 */
	xrjApi.addResource = function(params){
		var url = APIENTRY + '/resources';
		return authApi.postAsync(url, params);
	}
	
	
	/**
	 * @description 意见反馈
	 */
	xrjApi.feedback = function(params){
		var url = APIENTRY + '/feedback';
		return authApi.postAsync(url, params);
	}
	
	
	/*
	 * @description 注册用户
	 * 
	 */
	xrjApi.register = function(params){
		var url = APIENTRY + '/auth/register';
		params.password = aesUtil.encrypt(params.passowrd);
		return authApi.postAsync(url, params);		
	}
	
	
	/*
	 * @description 登录
	 */
	xrjApi.login = function(params){
		var url = APIENTRY +　'/auth/login';
		params.password = aesUtil.encrypt(params.password);
		return authApi.postAsync(url, params);
	}
	
	/**
	 * @description 获取分类
	 */
	xrjApi.getCategories = function(){
		var url = APIENTRY + '/category';
		return authApi.getAsync(url);
	}


	/**
	 * @description 获取商家列表
	 */
	xrjApi.getMerchantList = function (params) {
		var url = APIENTRY + '/merchant/search';
		return authApi.getAsync(url, params);
	}
	
	/**
	 * @description 猜你喜欢商家列表
	 */
/*
	xrjApi.getFavorite = function(){
		
		return getGeoLocation().then(function(position){
			//console.log(position.coords);
			var params = {
				orderByFieldName : MerchantSearchOption.Intelligent,
				orderBy : 'DESC',
				longitude:position.coords.longitude,
				latitude: position.coords.latitude,
				pageIndex : 1,
				pageSize:　10
				
			};
			var url = APIENTRY + '/merchant/search';
			return authApi.getAsync(url, params);
		})
	}
*/

	

	/**
	 * @description 下载服务器上的文件
	 */
	xrjApi.downloadFile = function (url) {
		return new Promise(function (resolve, reject) {
			var task = plus.downloader.createDownload(url,
                {},
                function (download, status) {
                    if(status == 200 )
                        resolve(download);
                    else
                        reject(download);
                });
            task.start();
		});
	}
	
	
	return xrjApi;
});
