/**
 * Created by lee on 2017/4/9.
 */
define(['../lib/xrjapi', './categories'], function (xrjApi, categoryModel) {

    var merchant = {};

    const MerchantSearchOption = {
        Intelligent: 'create_time',
        GoodComment: 'average_score',
        CachBack: 'cashback_ratio',
        Distance: 'distance'
    };


    function getGeoLocation() {
        return new Promise(function (resolve, reject) {
            plus.geolocation.getCurrentPosition(
                function (position) {
                    resolve(position);
                },
                function (error) {
                    reject(error.message);
                },
                {
                    timeout: 5000,
                    provider: 'baidu',
                    geocode: false
                }
            );
        });
    };


    //猜你喜欢
    merchant.favoriteList = function () {
        return getGeoLocation().then(function (position) {
            var params = {
                orderByFieldName: MerchantSearchOption.Intelligent,
                orderBy: 'DESC',
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                pageIndex: 1,
                pageSize: 10

            };
            return xrjApi.getMerchantList(params).then(function (data) {
                var list =  data.domains;
                var categories = categoryModel.getLocal();
                for(var i = 0; i < list.length; i++)
                {
                    list[i].percentScore = Math.round(list[i].averageScore * 20) + '%' ;
                    list[i].categoryName = categoryModel.findByChildId(list[i].categoryId);
                    var range = '';
                    if(list[i].distance > 1000 )
                        range = Math.round(list[i].distance / 100) / 10 + 'km';
                    else
                        range = Math.round(list[i].distance) + 'm';
                    list[i].distanceRange = range;
                    list[i].percentCashRatio = Math.round(list[i].cashbackRatio * 100) + '%';
                }
                return list;
            });
        });
    };

    //搜索商家列表
    merchant.searchList = function (firstCategory, childCategory, keyword, distance, orderBy) {
        return getGeoLocation().then(function (position) {
            var params = {
                orderByFieldName: MerchantSearchOption.Intelligent,
                orderBy: 'DESC',
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                pageIndex: 1,
                pageSize: 20

            };
            return xrjApi.getMerchantList(params).then(function (data) {
                var list =  data.domains;
                var categories = categoryModel.getLocal();
                for(var i = 0; i < list.length; i++)
                {
                    list[i].percentScore = Math.round(list[i].averageScore * 20) + '%' ;
                    list[i].categoryName = categoryModel.findByChildId(list[i].categoryId);
                    var range = '';
                    if(list[i].distance > 1000 )
                        range = Math.round(list[i].distance / 100) / 10 + 'km';
                    else
                        range = Math.round(list[i].distance) + 'm';
                    list[i].distanceRange = range;
                    list[i].percentCashRatio = Math.round(list[i].cashbackRatio * 100) + '%';
                }
                return list;
            });
        });
    }


    return merchant;
});