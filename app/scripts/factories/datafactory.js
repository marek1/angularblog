angularblog
.factory('dataFactory', ['$http',
function($http) {

    'use strict';
	
	var blogUrl = 'blogs';
	var accountUrl = 'account'; 
	var authGithub = 'auth/github';
	var logoutUrl = 'logout';
	var dataFactory = {};
	dataFactory.getBlogs = function() {
		return $http.get(blogUrl);
	};
	dataFactory.getBlogByUrl = function(id) {
		return $http.get(blogUrl + '/url/' + id);
	};
	dataFactory.updateBlogById = function(blog) {
		return $http.put(blogUrl + '/' + blog._id, blog);
	};
	dataFactory.insertBlog = function(blog) {
		return $http.post(blogUrl, blog);
	};
	dataFactory.deleteBlogById = function(id) {
		return $http.delete (blogUrl + '/' + id);
	};
	dataFactory.retrieveUserAccount = function() {
		return $http.get (accountUrl);
	};
	dataFactory.authenticateGithub = function() {
		return $http.get (authGithub);
	};
	dataFactory.logoutUser = function() {
		return $http.get (logoutUrl);
	};
	return dataFactory;
}]);