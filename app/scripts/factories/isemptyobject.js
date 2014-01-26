angularblog
.factory('isEmptyObject', function() {

    'use strict';

	// Speed up calls to hasOwnProperty
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	if (!Object.prototype.hasOwnProperty) {
		Object.prototype.hasOwnProperty = function(prop) {
			var proto = this.__proto__ || this.constructor.prototype;
			return ( prop in this) && (!( prop in proto) || proto[prop] !== this[prop]);
		};
	}

	var isEmptyObject = {};
	isEmptyObject.isEmpty = function(obj) {

		// null and undefined are "empty"
		if (obj === null){
			return true;
		}
		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length && obj.length > 0){
			return false;
		}
		if (obj.length === 0){
			return true;
		}
		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and toValue enumeration bugs in IE < 9
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)){
				return false;
			}
		}

		return true;
	};
	return isEmptyObject;
});