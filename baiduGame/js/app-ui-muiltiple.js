var myapp = angular.module('myapp',['ui.router']);

myapp.config(function($stateProvider,$urlRouterProvider){
    //$urlRouterProvider.otherwise('/home');
	$stateProvider
        .state('index', {
            url: '',
            //url: '/home',
            abstract: true
        })
        .state('route1', {
            url: '/route1',
            views: {
                'viewA@': {
                    template: 'route1.viewA'
                },
                'viewB@':{}
            }
        })
        .state('route2', {
            url: '/route2',
            views: {
                'viewB@':{
                    template: 'route2.viewB'
                }
            }
        });
});