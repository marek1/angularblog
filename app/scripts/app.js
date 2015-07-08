var angularblog = angular.module('angularblog', [])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    'use strict';

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    }).when('/blog/:url', {
      templateUrl: 'views/blog.html',
      controller: 'BlogController'
    }).when('/add', {
      templateUrl: 'views/blog.html',
      controller: 'AddController'
    }).otherwise({
      redirectTo: '/'
    });

  }]);
