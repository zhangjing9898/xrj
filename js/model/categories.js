define(['../lib/xrjapi'], function(xrjApi){
	
	var categoryModel = {};

	const Key = 'MerchantCategory';


/*    function commpareCategory(local, remote) {
        if(!local)
            return false;
        if(local.length != remote.length)
            return false;
        for(var i = 0; i < local.length; i++)
        {
            if(local[i].categoryName != remote[i].categoryName)
                return false;
            if(local[i].previewImage != remote[i].preiviewImage)
                return false;
            var localChildren = local[i].childCategories;
            var remoteChildren = remote[i].childCategories;
            if(localChildren && remoteChildren) {
                if(localChildren.length != remoteChildren.length)
                    return false;
                for (var j = 0; j < localChildren.length; j++) {
                    if (localChildren[j].categoryName != remoteChildren[j].categoryName)
                        return false;
                }
            }
        }
    }*/

	categoryModel.refreshCategory = function (plus) {
		return xrjApi.getCategories().then(function (remote) {
            var urls = remote.map(function (value) {
               return xrjApi.downloadFile(value.previewImage);
            });
            return Promise.all(urls).then(
                function (downloads) {
                    downloads.map(function (d, index) {
                        remote[index].localPreviewImage = plus.io.convertLocalFileSystemURL(d.filename);
                    });
                    //保存
                    var stringObj = JSON.stringify(remote);
                    localStorage.setItem(Key, stringObj);
                    return remote;
                }
            );

		});
	};

	//singleton
	var cachedCategories = null;
	
	categoryModel.getLocal = function () {
		if(cachedCategories)
			return cachedCategories;
		var str = localStorage.getItem(Key);
		if(str) {
			cachedCategories = JSON.parse(str);
			return cachedCategories;
		}
		else
			return null;
	};


	categoryModel.findByChildId = function (childId) {
		var categories = categoryModel.getLocal();
		for(var j = 0; j < categories.length; j++)
		{
			var childCategories = categories[j].childCategories;
			if(childCategories) {
				for (var k = 0; k < childCategories.length; k++) {
					if (childCategories[k].id == childId)
						return childCategories[k].categoryName ;
				}
			}
		}
		return '';
	};
	

	return categoryModel;
});
