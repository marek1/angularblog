angularblog
.controller('LoginController', ['$scope', '$rootScope', 'dataFactory',
function($scope, $rootScope, dataFactory) {

    'use strict';
    
	$scope.loginStatus = "";
	console.log('loginStatus : ',$scope.loginStatus, ' and type ',typeof $scope.loginStatus);
	dataFactory.retrieveUserAccount().success(function(data) {
		$scope.loginStatus = data;
		$rootScope.username= data;
	}).error(function(error) {

	});
	
	$scope.logout = function(){
		console.log('logging out');
		dataFactory.logoutUser();
		$scope.loginStatus="";
		$rootScope.username="";
		
	};
}]);