angular.module('myAppTest', ['angularblog', 'ngMockE2E']).run(function($httpBackend) {

	'use strict';

	var blogs = [{
		'_id' : '52927452b4992b1c2400000c',
		'header' : 'adsads-ini',
		'description' : 'nknkn',
		'url' : 'dkdkd-inn',
		'time' : 1387984800000,
	}, {
		'header' : 'kmkjkjkj',
		'description' : 'kjjkkjkj',
		'url' : 'kjjkjk',
		'time' : 1387984800579,
		'_id' : '52baf7a033980cd14e000001'
	}];

	$httpBackend.whenGET('blogs').respond(blogs);

	$httpBackend.whenGET('blogs/url/kjjkjk').respond(blogs[blogs.length - 1]);
	$httpBackend.whenGET(/^\w+.*/).passThrough();

	$httpBackend.whenPOST('blogs').respond(function(method, url, data, headers) {
		console.log('Received these data:', method, url, data, headers);
		blogs.push(angular.fromJson(data));
		return [200, {}, {}];
	});
	$httpBackend.whenPOST(/^\w+.*/).passThrough();

	$httpBackend.whenPUT('blogs/52baf7a033980cd14e000001').respond(function(method, url, data, headers) {
		console.log('Received these data:', method, url, data, headers);
		blogs[blogs.length - 1] = angular.fromJson(data);
		return [200, {}, {}];
	});
	$httpBackend.whenPUT(/^\w+.*/).passThrough();

	$httpBackend.whenDELETE('blogs/52baf7a033980cd14e000001').respond(function(method, url, data, headers) {
		console.log('Received these data:', method, url, data, headers);
		blogs.pop();
		return [200, {}, {}];
	});
	$httpBackend.whenDELETE(/^\w+.*/).passThrough();

});