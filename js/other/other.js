mui.init();
			
			var IncomeTutorial = document.getElementById("IncomeTutorial");	//收益教程
			var RevenueCalculus = document.getElementById("RevenueCalculus");//收益演算
			var MerchantsSettled = document.getElementById("MerchantsSettled");//商家入驻
						
			var UpdateCheak = document.getElementById("UpdateCheck");//检查更新
			var ClearCache = document.getElementById("ClearCache");//清除缓存
			var CustomerServiceCenter = document.getElementById("CustomerServiceCenter");//客服中心
			var Help = document.getElementById("Help");//帮助
			var About = document.getElementById("About");//关于
			
			
			//收益教程
			IncomeTutorial.addEventListener('tap',function(){
				
			});
			
			//收益演算
			RevenueCalculus.addEventListener('tap',function(){
				mui.openWindow({
					url:'../other/other-incomeCalculus.html',
					id:'other-incomeCalculus'
				})
			});
			
			//商家入驻
			MerchantsSettled.addEventListener('tap',function(){
				
			});
			
			//检查更新
			UpdateCheak.addEventListener('tap',function(){  
        		mui.toast("当前为最新版本!",{ duration:'short', type:'div' })
    		});  
			
			//清除缓存
			ClearCache.addEventListener('tap',function(){
				var CacheSize = 28.86;
				var confirmMessage = "是否清除" + CacheSize + "Mb的缓存?";
				var toastMessage = CacheSize+"Mb的缓存已经清除!";
				var btn = ['确认', '取消'];
				
				mui.confirm(confirmMessage,"",btn,function(e){
					if(e.index == 0){
						mui.toast(toastMessage);
					}else{
						mui.toast("点击了取消按钮");
					};
				},'div');
			});
			
			//客服中心
			CustomerServiceCenter.addEventListener('tap',function(){
				
				
			});
			
			//帮助
			Help.addEventListener('tap',function(){
				mui.alert("薪仁居是....................................................................................................",
				"帮助",
				"我知道了",
				function(){},//回调函数
				'div'//强制使用div绘制
				);
			});
			
			//关于
			About.addEventListener('tap',function(){
				
			});