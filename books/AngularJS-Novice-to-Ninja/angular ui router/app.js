'use strict';

var app = angular.module('myApp',['ui.router','myApp.controllers']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {  //$stateProvider and $urlRouterProvider are from ui.router module
    $stateProvider
        .state('view1',{
            url: '/view1',
            templateUrl: 'partials/view1.html',
            controller: 'ctrl1'
        })
        .state('view2',{
            url: '/view2/:firstname/:lastname',
            templateUrl: 'partials/view2.html',
            controller: 'ctrl2',
            resolve: {
                names: function() {
                    return ['Misko','Eric','Vojta','Brad'];
                }
            }
        });

    $urlRouterProvider.otherwise('/view1');
    $locationProvider.html5Mode(false);
});
