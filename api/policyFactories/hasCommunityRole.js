/*
 * hasCommunityRole.js
 * Drew Nelson
 * Oct 21 2016
 *
 * @module			:: Policy Factory
 * @description	:: Verifies the user has the passed role for the community or is an Admin of community
 * 							:: Also allows access if the user has a SuperUser role
 */

module.exports = function(role) {
 	return function(req, res, next) {
 		var roles = {Admin: 1, Member: 2, SuperUser: 3};
 		// set the search params to search for desired role or admin for community, or superuser access
 		var criteria = [{community: req.params.commID, user: req.user.id, role: roles[role]},
 										{community: req.params.commID, user: req.user.id, role: 1},
 										{user: req.user.id, role: 3}];
 		CommunityMember
 			.find(criteria)
 			.then(function(members) {
 				if(members) return next();
 				else return res.forbidden();
 			});
 	}
}