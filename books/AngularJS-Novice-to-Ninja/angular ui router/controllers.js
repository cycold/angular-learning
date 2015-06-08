'use strict';

var ctrls = angular.module('myApp.controllers',[]);

ctrls.controller('mainController',function($scope) {
    console.log('mainController');
});

ctrls.controller('ctrl1', function($scope, $location, $rootScope, $state) {

    $scope.loadView2 = function() {
        //console.log($location);
        //$location.path('/view2/'+$scope.firstname+'/'+$scope.lastname);

        // the following activates state view2
        console.log($scope.firstname);
        $state.go('view2', {
            firstname: $scope.firstname,
            lastname: $scope.lastname
        });
    };

    $rootScope.$on('$routeChangeSuccess',function() {
        console.log('$routeChangeSuccess - ctrl1');
    })
});


ctrls.controller('ctrl2', function($scope, $stateParams, names, $rootScope) {
    console.log($stateParams);
    $scope.firstname = $stateParams.firstname;
    $scope.lastname = $stateParams.lastname;
    $scope.names = names;

    $rootScope.$on('$routeChangeSuccess',function() {
        console.log('$routeChangeSuccess - ctrl2');
    })

});