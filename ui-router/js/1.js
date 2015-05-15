angular.module('myapp',['ui.router'])

    .config(function($stateProvider){
    	$stateProvider
            .state('home',{
                url: '',
                templateUrl: 'partials/1-home.html',
                abstract: true
            })
            .state('home.h',{
                url: '',
                templateUrl: 'partials/1-home.html'
            })
            .state('home.a',{
                url: '/a',
                //templateUrl: 'partials/1-a.html'
                views: {
                    'viewA':{
                        templateUrl: 'partials/1-a.html'
                    }
                }
            })
            .state('home.b',{
                url: '/b',
                //templateUrl: 'partials/1-b.html'
                views: {
                    'viewB': {
                        templateUrl: 'partials/1-b.html'
                    }
                }
            })
    })


