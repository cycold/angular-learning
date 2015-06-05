'use strict';

var app = angular.module('myApp',['ui.router','myApp.controllers']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {  //$stateProvider and $urlRouterProvider are from ui.router module
	$stateProvider
        .state('view1',{
            url: '/view1',
            templateUrl: '/partials/view1.html',
            controller: 'Controller1'
        })
        .state('/view2',{
            url: '/view/:firstName/:lastName',
            templateUrl: '/partials/view2.html',
            controller: 'Controller2',
            resolve: {
                names: function() {
                    return ['Misko','Eric','Vojta','Brad'];
                }
            }
        });

    $urlRouterProvider.otherwise('/view1');
    $locationProvider.html5Mode(false);
});



//模块定义
angular.module('myApp.controllers',[])

    .controller('Controller1',function($scope, $location, $state) {
    	$scope.loadView2 = function() {
    		//the following activates state view2
            $state.go('view2',{
                firstName: $scope.firstName,
                lastName: $scope.lastName
            })
    	}
    })

    .controller('Controller2',function($scope, $location, $state, $stateParams, names) {
    	$scope.firstName = $stateParams.firstName;
        $scope.lastName = $stateParams.lastName;
        $scope.names = names;
    })