angular.module('myApp',['ngRoute','myApp.controllers']);

angular.module('myApp')
    //.config(function($routeProvider, $locationProvider, $location) {        //注意 $location不能在此注入到config中,可以在控制器中注入使用
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/view1',{
                templateUrl: 'partials/view1.html',
                controller: 'ctrl1'
            })
            .when('/view2',{
                templateUrl: 'partials/view2.html',
                controller: 'ctrl2'
            });

        $routeProvider.otherwise({redirectTo: '/view1'});

        //使用HTML5mode
        //$locationProvider.html5Mode(true);
    });