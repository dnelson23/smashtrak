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
 		var roles = {SuperUser: 1, Admin: 2, Member: 3};
 		// set the search params to search for desired role or admin for community, or superuser access
 		var criteria = [{community: req.params.commID, user: req.user.id, role: roles[role]},
 										{community: req.params.commID, user: req.user.id, role: 2},
 										{user: req.user.id, role: 1}];
 		CommunityMember
		.find({or: criteria, sort: 'role'})
		.populate('role')
		.then(function(member) {
			if(member.length > 0) {
				// check to see if the user is a SU AND an Admin for the community
				// if so, pass the Admin role so the user doesn't get any SU warnings
				if(member[0].role.type == 'SuperUser' && (member[1] && member[1].role.type == 'Admin')) res.locals.role = member[1].role;
				else res.locals.role = member[0].role;
				return next();
			}
			else return res.forbidden();
		});
 	}
}