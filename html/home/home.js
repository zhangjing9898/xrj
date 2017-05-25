require.config({
	baseUrl:'../../js',
	shim:{
		'lib/mui':{
			exports:'mui'
		}
	}
});

require(['lib/mui'], function(mui){
	var url = 'favoriteList.html';
	mui.init({
		subpages:[{
			url:url,
			id:url,
			styles:{
				top:'160px',
				bottom:'0px'
			}
			
		}],
		beforeback:function () {
			return false;
		}
	});
	
	
})
