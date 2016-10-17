/**
 * TournamentController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Tournament Controller actions
 */

 module.exports = {

 	new: function(req, res) {
 		Community
 		.findOne(req.params.commID)
 		.then(function(community) {
 			res.view('tournament/new', { community: community });
 		})
 		.catch(function(err) {
 			res.negotiate(err);
 		});
 	},

 	create: function(req, res) {

 	}

}
