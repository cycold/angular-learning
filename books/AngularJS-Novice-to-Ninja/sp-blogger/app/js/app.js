angular.module('spBlogger',['ui.router','spBlogger.posts','spBlogger.admin'])
    .run(['$state',function($state) {
        $state.go('allPosts');
    }]);