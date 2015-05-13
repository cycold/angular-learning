angular.module('myapp',['ngRoute'])

    .config(function($routeProvider){
      $routeProvider
        .when('/',{
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        })
        .when('/list-item',{
            templateUrl: 'partials/list-item.html',
            controller: 'ListItemController'
        })
        .when('/list-card',{
            templateUrl: 'partials/list-card.html',
            controller: 'CardItemController'
        })
        .otherwise('/');
    })

    .controller('HomeController',function($scope,$http){
      $scope.$emit('dataSuccess');

        $scope.$on('$routeChangeStart',function(){
            $scope.$emit('dataSuccess');
        });
    })

    .controller('appListController',function($scope,$route,$http){
        $scope.$on("$routeChangeSuccess",function(e){

        });
    })

    .controller('ListItemController',function($scope,$http){
        $scope.dataList = [];

        $http.get("http://iceapps.qiniudn.com/recsoft/recsoft_pn_0.json")
            .success(function(result){
                $scope.$emit('dataSuccess');
                for(var i = 0; i < result.data.length; i++){
                    $scope.dataList.push(result.data[i]);
                }
            })

        $scope.loadmore = function(){
            console.log('loadmore...');
            $http.get("http://iceapps.qiniudn.com/recsoft/recsoft_pn_1.json")
                .success(function(result){
                    //$scope.$emit('dataSuccess');
                    for(var i = 0; i < result.data.length; i++){
                        $scope.dataList.push(result.data[i]);
                    }
                })
        }
    })

    .controller('CardItemController',function($scope,$http){

        $scope.dataList = [];

        $http.get('http://iceapps.qiniudn.com/Finder/finder_pn_0.json')
            .success(function(result){
                $scope.$emit('dataSuccess');
              for(var i = 0; i < result.data.length; i++) {
                    $scope.dataList.push(result.data[i]);
                }
            })

        $scope.loadmore = function(){
            // console.log('loadmore...');
            $http.get("http://iceapps.qiniudn.com/Finder/finder_pn_1.json")
                .success(function(result){
                    //$scope.$emit('dataSuccess');
                    for(var i = 0; i < result.data.length; i++){
                        $scope.dataList.push(result.data[i]);
                    }
                })
        }


    })

    .directive('loading',function($rootScope,$location,$route){
        return {
            restrict: 'E',
            template: "<p ng-if='isLoading'>loading...</p>",
            link: function(scope,ele,attr,ctrl){
              scope.isLoading = false;
                scope.$on('$routeChangeStart',function(e){
                  scope.isLoading = true;
                    if($location.path() == ""){
                        scope.isLoading = false;
                        $route.reload();
                    }

                });
                /*scope.$on('$routeChangeSuccess',function(){
                  scope.isLoading = false;
                });*/
                scope.$on("dataSuccess",function(){
                    scope.isLoading = false;
                })
            }
        }
    })

    .directive('fallbackSrc',function(){
        return {
            restrict: 'A',
            //scope:{src:'@fallbackSrc'}, //选择继承作用域的某些值 直接将 {{app.ico}} 和这里的孤立域中的src绑定
            //scope:{src:'=fallbackSrc'}, //直接将 app.ico 和这里的孤立域中的src绑定 双向的绑定
            scope:{fallbackSrc:'='}, //直接将 app.ico 和这里的孤立域中的src绑定 双向的绑定 省略的写法
            link: function(scope,ele,attr,ctrl){
                var img = new Image();
                scope.src = scope.src || scope.fallbackSrc;
                img.src = 'http://iceapps.qiniudn.com/Finder/icon/' + scope.src;
                //if(img.complete) return;
                img.onload = function(){
                    //console.log(ele);  //注意这里ele为jqLite对象数组
                  ele[0].src = 'http://iceapps.qiniudn.com/Finder/icon/' + scope.src;
                }
            }
        }
    })