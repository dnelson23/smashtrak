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
 				return res.view('community/index', { community: community, role: res.locals.role })
 			} else {
 				return res.notFound(undefined, {description: 'Could not find that community.'});
 			}
 		})
		.catch(function(err) {
			res.negotiate(err);
		});
 	},

 	new: function(req, res) {
 		return res.view('community/new');
 	},

 	create: function(req, res) {
 		var commParams = {
 			name: req.param('name'),
 			description: req.param('description'),
 			createdBy: req.user.id,
 			updatedBy: req.user.id
 		};

 		// create the community, add creating user as an admin and load community view
 		Community
 		.create(commParams)
 		.then(function(comm) {
 			var memberParams = {
 				community: comm.id,
 				user: req.user.id,
 				role: 2,
 				createdBy: req.user.id,
 				updatedBy: req.user.id
 			};

 			CommunityMember
 			.create(memberParams)
 			.then(function(member) {
 				return res.redirect('/c/'+comm.id);
 			})
 			.catch(function(err) {
 				return res.negotiate(err)
 			});
 		})
 		.catch(function(err) {
 			return res.negotiate(err);
 		});
 	},

 	edit: function(req, res) {

 	}
}
