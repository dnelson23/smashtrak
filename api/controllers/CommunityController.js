/**
 * CommunityController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Community Controller actions
 */

 module.exports = {

 	find: function(req, res) {
 		Community
 		.findOne(req.params.commID)
 		.populate('tournaments')
 		.populate('smashers')
 		.then(function(community) {
 			if(community != null) {
 				CommunityMember
 				.find({ where: { community: community.id, user: req.user.id }, sort: 'role', limit: 1 })
 				.populate('role')
 				.then(function(memberRole) {
 					return res.view('community/index', {community: community, role: memberRole[0].role.type});
 				})
 				.catch(function(err) {
 					res.negotiate(err);
 				});
 			} else {
 				return res.notFound(undefined, {description: 'Could not find that community.'});
 			}
 		})
		.catch(function(err) {
			res.negotiate(err);
		});
 	},

 	uploadTournament: function(req, res) {

 	}

}
