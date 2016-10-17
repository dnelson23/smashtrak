/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 */

module.exports = {

	create: function(req, res) {
		var pass = req.param('password'),
				rePass = req.param('reenter-pass');

		if(pass !== rePass) {
			FlashService.error(req, 'Passwords do not match');
			res.redirect('back');
		} else {
			User.create({
				email: req.param('email'),
				username: req.param('username'),
				password: req.param('password')
			}).exec(function(err, user) {
				if(err) {
					res.negotiate(err);
				} else {
					FlashService.success(req, 'Registration Complete');
					res.redirect('/');
				}
			});
		}
	},

	edit: function(req, res) {

	},

	dashboard: function(req, res) {
		res.view('dashboard/index');
	},

	/**
	 * User Controller action, lists communities the user is a member of
	 */
	communities: function(req, res) {
		// first find communities the user is a member of through the intermediary table
		CommunityMember
			.find({user: req.user.id})
			.then(function(members) {
				// pull community IDs from the CommunityMemberObjects and pass it to Community find
				var comIDs = members.map(function(i) { return i.community; });
				Community
				.find(comIDs)
				.populate('tournaments')
				.populate('smashers')
				.then(function(communities) {
					res.view('dashboard/communities', {communities: communities});
				})
			})
			.catch(function(err) {
				console.log(err);
				FlashService.error(req, 'Something went wrong.');
				res.redirect('back');
			});
	}
	
};
