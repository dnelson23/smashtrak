/*
 * is.js
 * Drew Nelson
 * Sep 1 2016
 *
 * @module			:: Policy Factory
 * @description	:: Verifies user has requested role, designed mainly for SuperUsers at the moment
 */

module.exports = function(role) {
 	return function(req, res, next) {
 		var roles = {SuperUser: 1, Admin: 2, Member: 3};

 		CommunityMember
 			.find({ user: req.user.id, role: roles[role] })
 			.then(function(members) {
 				if(members) return next();
 				else return res.forbidden();
 			});
 	}
}