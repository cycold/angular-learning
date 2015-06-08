var ctrls = angular.module('myApp.controllers',[]);

ctrls.controller('mainController',function() {
	console.log('load mainController...');
});


ctrls.controller('ctrl1', function($scope) {
	$scope.message = 'hello world';
});


ctrls.controller('ctrl2', function($scope) {
	$scope.now = new Date();
});
