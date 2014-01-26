'use strict';
 
describe('MainController Unit test', function(){
    var scope, $httpBackend;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('angularblog'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
    	//Inject fake backend	
    	var blogs = [
		  {
		    "_id": "52927452b4992b1c2400000c",
		    "header": "adsads-ini",
		    "description": "nknkn",
		    "url": "dkdkd-inn",
		    "time": 1387984800000,
		  },
		  {
		    "header": "kmkjkjkj",
		    "description": "kjjkkjkj",
		    "url": "kjjkjk",
		    "time": 1387984800579,
		    "_id": "52baf7a033980cd14e000001"
		  }
		];
    	$httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'blogs').respond(blogs);
        
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('MainController', {$scope: scope});
    }));
    // tests start here
    it('should have variable status = "Loading!"', function(){
        expect(scope.status).toBe('Loading');
    });
    it('should fetch list of users', function(){
        $httpBackend.flush();
        expect(scope.blogs.length).toBe(2);
        expect(scope.blogs[0].header).toBe('adsads-ini');
        
        //Should fail :
        //expect(scope.blogs[0].header).toBe('');
    });
});