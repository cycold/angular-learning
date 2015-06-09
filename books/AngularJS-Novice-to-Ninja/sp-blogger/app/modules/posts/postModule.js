angular.module('spBlogger.posts',['spBlogger.posts.services','spBlogger.posts.controllers']);

angular.module('spBlogger.posts').config(['$stateProvider','$locationProvider',function($stateProvider, $locationProvider) {
	$stateProvider
        .state('allPosts', {    //所有文章
            url:'/posts',
            templateUrl: 'modules/posts/views/posts.html',
            controller: 'PostController'
        })

        .state('singlePost', {  //单篇文章
            url: '/posts/:id/:permalink',
            templateUrl: 'modules/posts/views/singlePost.html',
            controller: 'PostDetailsController'
        })

}]);

