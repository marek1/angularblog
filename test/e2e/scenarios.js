describe('my tasks app', function(){
	
 	beforeEach(function() {
	    browser().navigateTo('/index-e2e.html');
 		
    });
	describe('Homepage', function() {
		it('should find an add button', function(){
			expect(element('h2 a').count()).toEqual(1);
		});
		it('should find an add button', function(){
		 	expect(element('.blogs').count()).toBe(2);
		}); 	
	}); 		
	describe('Add Blog page', function() {	
		it('should add a blog', function(){
			element('h2 a').click();
		 	expect(browser().location().path()).toBe("/add");
			input('header').enter('my-angular-e2e-test');
		 	expect(input('header').val()).toEqual('my-angular-e2e-test');
			input('description').enter('my-angular-e2e-test');
		 	expect(input('description').val()).toEqual('my-angular-e2e-test');
			input('url').enter('my-angular-e2e-test');
		 	expect(input('url').val()).toEqual('my-angular-e2e-test');
		 	expect(element('.btn-primary').count()).toBe(1);
		 	element('.btn-primary').click();
		 	expect(browser().location().path()).toBe("/");
		 	expect(element('.blogs').count()).toBe(3);
		});
	});	
	describe('Retrieve Blog page', function() {	
		it('should retrieve the blog', function(){
			element('.blogs:last-child a').click();
		 	expect(input('header').val()).toEqual("kmkjkjkj");
		 	expect(input('description').val()).toEqual("kjjkkjkj");
		 	expect(input('url').val()).toEqual("kjjkjk");
		 	expect(element('.back').count()).toBe(1);
		 	expect(element('.btn-primary').count()).toBe(1);
		 	expect(element('.btn-danger').count()).toBe(1);
		 	expect(element('.back').count()).toBe(1);
		 	element('.back').click();
		 	expect(browser().location().path()).toBe("/");
		 });
	});
	describe('Edit Blog page', function() {	
		it('should edit the blog', function(){
			element('.blogs:last-child a').click();
		 	input('header').enter('neuer Test');
		 	expect(input('header').val()).toEqual('neuer Test');
		 	element('.btn-primary').click();
		 	expect(browser().location().path()).toBe("/");
		 	expect(element('.blogs').count()).toBe(2);
		 	expect(element('.blogs:last-child h3').html()).toContain("neuer Test");
		});
	});
	describe('Delete Blog page', function(){
		it('should delete the blog', function(){
			element('.blogs:last-child a').click();
		 	expect(element('.btn-primary').count()).toBe(1);
		 	expect(element('.btn-danger').count()).toBe(1);
		 	element('.btn-danger').click();
		 	expect(browser().location().path()).toBe("/");
		 	expect(element('.blogs').count()).toBe(1);
		});
	});
	
	
});