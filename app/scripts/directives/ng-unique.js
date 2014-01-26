angularblog.directive('ngUnique', ['isEmptyObject', 'dataFactory',
function(isEmptyObject, dataFactory) {
	return {
		require : 'ngModel',
		link : function(scope, elem, attrs, ctrl) {

			elem.bind('blur', function(evt) {
				scope.$apply(function() {
					var val = elem.val();
					console.log('val : ',val);
					ctrl.$setValidity('unique', false);
					dataFactory.getBlogByUrl(val).success(function(blog) {
						console.log('blog ; ',blog);
						if (isEmptyObject.isEmpty(blog)) {
							ctrl.$setValidity('unique', true);
						}else{
							ctrl.$setValidity('unique', false);
						}
					});
				});
			});
		}
	};
}]);
