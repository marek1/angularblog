angularblog
.controller('MainController', ['$scope', 'isEmptyObject', 'dataFactory',
function($scope, isEmptyObject, dataFactory) {

    'use strict';
    
	$scope.blogs=[];
	$scope.status = 'Loading';
	dataFactory.getBlogs().success(function(blogs) {
		$scope.blogs = blogs;
		if (isEmptyObject.isEmpty(blogs)) {
			$scope.status = 'No blogs found';
		} else {
			$scope.status = '';
		}
	}).error(function(error) {
		$scope.status = 'Unable to load blogs: ' + error.message;
	});
	
}]);