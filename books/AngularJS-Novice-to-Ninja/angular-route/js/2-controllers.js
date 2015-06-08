var ctrls = angular.module('myApp.controllers',[]);

ctrls.controller('mainController',function($rootScope) {
    console.log('load mainController...');

    $rootScope.$on('$routeChangeSuccess',function() {
        console.log('$routeChangeSuccess');
    })
});


ctrls.controller('ctrl1', function($scope, $location, $rootScope) {

    $scope.loadView2 = function() {
        //console.log($location);
    	$location.path('/view2/'+$scope.firstname+'/'+$scope.lastname);
    };

    $rootScope.$on('$routeChangeSuccess',function() {
        console.log('$routeChangeSuccess - ctrl1');
    })
});


ctrls.controller('ctrl2', function($scope, $routeParams, names, $rootScope) {
    $scope.firstname = $routeParams.firstname;
    $scope.lastname = $routeParams.lastname;
    $scope.names = names;

    $rootScope.$on('$routeChangeSuccess',function() {
    	console.log('$routeChangeSuccess - ctrl2');
    })

});
