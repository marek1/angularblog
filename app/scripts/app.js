var angularblog = angular.module('angularblog', [])
.config(['$routeProvider', function($routeProvider,$locationProvider) {
	
    'use strict';

	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainController'
	}).when('/blog/:url', {
		templateUrl : 'views/blog.html',
		controller : 'BlogController'
	}).when('/add', {
		templateUrl : 'views/blog.html',
		controller : 'AddController'
	}).otherwise({
		redirectTo : '/'
	});
	
}]);
