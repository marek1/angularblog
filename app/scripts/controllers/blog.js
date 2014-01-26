angularblog
.controller('BlogController', ['$scope', '$routeParams', '$location', 'isEmptyObject', 'dataFactory',
function($scope, $routeParams, $location, isEmptyObject, dataFactory) {
	
    'use strict';
    
	$scope.header ='';
	$scope.description ='';
	$scope.url = '';
	$scope.time = '';
	$scope.insertName = '';
	$scope.status = 'Loading';
	this.url = $routeParams.url;
	$scope.editUrl = this.url;

	dataFactory.getBlogByUrl(this.url).success(function(blog) {
		if (isEmptyObject.isEmpty(blog)) {
			$scope.status = 'No blog found';
		} else {
			console.log('url : ', blog.url);
			$scope.header = blog.header;
			$scope.description = blog.description;
			$scope.descriptionToHtml = $scope.description.replace(new RegExp('\r?\n','g'), '<br />');
			$scope.id = blog._id;
			$scope.url = blog.url;
			$scope.time = blog.time;
			$scope.convertedTime = new Date(blog.time).toUTCString();
			$scope.insertName = blog.username;
			console.log('insertName : ',$scope.insertName, ' typeof ', typeof $scope.insertName);
			$scope.status = '';
		}
	}).error(function(error) {
		$scope.status = 'Unable to load blog: ' + error.message;
	});

	$scope.submitBlogForm = function(header, description, url, id) {
		var blog = {
			'_id' : id,
			'header' : header,
			'description' : description,
			'url' : url
		};
		dataFactory.updateBlogById(blog).success(function() {
			$scope.status = 'Saved';
			$location.path('#/');
		}).error(function(error) {
			$scope.status = 'Unable to update blog: ' + error.message;
		});
	};
	$scope.deleteBlog = function(editId) {
		dataFactory.deleteBlogById(editId).success(function() {
			$scope.status = 'Deleted';
			$location.path('#/');
		}).error(function(error) {
			$scope.status = 'Unable to delete blog: ' + error; //error.message;
		});

	};
}])
.controller('AddController', ['$scope', '$rootScope', '$location', '$routeParams', 'dataFactory',
function($scope, $rootScope, $location, $routeParams, dataFactory) {
	$scope.header='';
	$scope.description='';
	$scope.url='';
	$scope.status = '';
	/*
	 * Have to set it to global username for it to be editable
	 */
	$scope.insertName = $rootScope.username;
	console.log('$scope.insertName : ',$scope.insertName);

	$scope.submitBlogForm = function(header, description, url) {
		var blog = {
			'header' : header,
			'description' : description,
			'url' : url.replace(/\s+/g, ' '),
			'time' : new Date().getTime(),
			'username' : ''
		};
		dataFactory.insertBlog(blog).success(function() {
			$scope.status = 'Inserted';
			$location.path('#/');
		}).error(function(error) {
			$scope.status = 'Unable to insert blog: ' + error.message;
		});
	};
}]);