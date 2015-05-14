var myapp = angular.module('myapp',['ui.router']);

myapp.config(function($stateProvider,$urlRouterProvider){
	//For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/state1");
    //Now set up the states
    $stateProvider
        .state('state1',{
            url: '/state1',
            templateUrl: 'partials/ui-router/state1.html'
        })
        .state('state1.list',{
            url: '/list',
            templateUrl: 'partials/ui-router/state1.list.html',
            controller: function($scope){
            	$scope.items = ["A","List","Of","Items"];
            }
        })
        .state('state2',{
            url: 'state2',
            templateUrl: 'partials/ui-router/state2.html'
        })
        .state('state2.list',{          //×´Ì¬state2.list ¶ÔÓ¦url  /listThings
            url: '/listThings',
            templateUrl: 'partials/ui-router/state2.list.html',
            controller: function($scope){
            	$scope.things = ['A', 'Set', 'Of', 'Things'];
            }
        });
});