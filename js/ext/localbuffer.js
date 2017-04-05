define(['../lib/mui'], function(mui){
	
	var localBuffer = {};

	localBuffer.getLocalString = function(key){
		return localStorage.getItem(key);
	}

	localBuffer.getLocalObject = function(key){
		var stringObj = localStorage.getItem(key);
		if(stringObj)
			return JSON.parse(stringObj);
		else
			return null;
	}

	localBuffer.saveLocalObject = function(key, obj){
		var stringObj = JSON.stringify(obj);
		localStorage.setItem(key, stringObj);
	}
	
	localBuffer.saveLocalString = function(key, str){
		localStorage.setItem(key, str);
	}
	
	return localBuffer;
});
