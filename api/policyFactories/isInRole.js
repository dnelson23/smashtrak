/*
 * is.js
 * Drew Nelson
 * Sep 1 2016
 *
 * @module			:: Policy Factory
 * @description	:: Verifies the user has the passed role
 */

module.exports = function(role) {
 	return function(req, res, next) {
 		var roles = req.user.roles;
 		if(roles.indexof(role) >= 0) {
 			return next();
 		}

 		return res.forbidden('You do not have access to this page');
 	}
}