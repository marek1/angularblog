'use strict';
 
describe('Add and BlogController Unit test', function(){
    var scope, $httpBackend; //we'll use these in our tests
	var postResult = {};
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('angularblog'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
    	//Inject fake backend	
    	var blog = [
		  {
		    "_id": "test_id_000001",
		    "header": "test header",
		    "description": "test description",
		    "url": "test-url",
		    "time": 1387984800000
		  }
		];
    	$httpBackend = _$httpBackend_;
        $httpBackend.when('POST', 'blogs').respond(blog);
        
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('AddController', {$scope: scope});
    }));
    // tests start here
    it('should have status = "!"', function(){
        expect(scope.status).toBe('');
    });
    it('should expect a post', function(){
    	var blog = 
		  {
		    "header": "test header",
		    "description": "test description",
		    "url": "test-url",
		    "time": new Date().getTime(),
		    "username" : ""
		  }
		;
        $httpBackend.expectPOST('blogs', blog).respond(500, '');
    	scope.submitBlogForm("test header","test description","test-url");
    });
    it('should fake a post', function(){
        scope.submitBlogForm("test header","test description","test-url");
		$httpBackend.flush();
    	expect(scope.status).toBe('Inserted');
    });
});