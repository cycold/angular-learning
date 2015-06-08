angular.module('myApp',['ngRoute','myApp.controllers']);

angular.module('myApp')
    //.config(function($routeProvider, $locationProvider, $location) {        //注意 $location不能在此注入到config中,可以在控制器中注入使用
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/view1',{
                templateUrl: 'partials/2-view1.html',
                controller: 'ctrl1'
            })
            .when('/view2/:firstname/:lastname',{
                templateUrl: 'partials/2-view2.html',
                controller: 'ctrl2',
                resolve: {
                    names: function(){
                        //typically you will use a service to retrieve values from the server here
                        return ['Misko','ericky','hello','sdfsd'];  //this is used as dependency value
                    }
                }
            });

        $routeProvider.otherwise({redirectTo: '/view1'});

        $locationProvider.html5Mode(true);

    });