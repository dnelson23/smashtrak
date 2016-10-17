/*
 * is.js
 * Drew Nelson
 * Sep 1 2016
 *
 * @module			:: Policy Factory
 * @description	:: Verifies the user has the passed role for the community or is an Admin
 */

module.exports = function(role) {
 	return function(req, res, next) {
 		CommunityMember
 			.find({community: req.params.commID, user: req.user.id})
 			.populate('role')
 			.then(function(members) {
 				for(var i = 0; i < members.length; i++) {
 					if(members[i].role.type == role || members[i].role.type == 'Admin'){
 						return next();
 					}
 				}

 				return res.forbidden();
 			});
 	}
}