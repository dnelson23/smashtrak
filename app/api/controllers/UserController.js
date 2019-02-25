/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 */

module.exports = {

	/* POST '/register'
	 * @param {String} email
	 * @param {String} username
	 * @param {String} password
	 * @param {String} reenter-pass
	 */
	create: function(req, res) {
		var pass = req.param('password'),
				rePass = req.param('reenter-pass');

		if(pass !== rePass) {
			FlashService.error(req, 'Passwords do not match');
			return res.redirect('back');
		} else {
			if(pass.length < 6) {
				FlashService.error(req, 'Password must be at least 6 characters.');
				return res.redirect('back');
			}
			User.create({
				email: req.param('email'),
				username: req.param('username'),
				password: req.param('password')
			}).exec(function(err, user) {
				if(err) {
					return res.negotiate(err);
				} else {
					FlashService.success(req, 'Registration Complete');
					return res.redirect('/');
				}
			});
		}
	},

	// GET '/u/:username'
	edit: function(req, res) {
		return res.view('user/index');
	},

	/* POST '/u/:username'
	 * @param {Object} user
	 * 					username	: string,
	 *					email 		: string,
	 *					password  : string
	 */
	update: function(req, res) {
		updatedUser = req.param('user');

		if(req.user.username != updatedUser.username) req.user.username = updatedUser.username;
		if(req.user.email != updatedUser.email) req.user.email = updatedUser.email;
		req.user.password = req.param('password');

		req.user.save(function(err) {
			if(err) return res.negotiate(err);

			FlashService.success(req, 'Profile updated successfully!');
			return res.redirect('u/edit');
		})

		return res.underConstruction();
	},

	// GET '/u/:username/dashboard'
	dashboard: function(req, res) {
		return res.redirect('/u/' + req.user.username + '/communities');
	},

	// GET '/u/:username/communities'
	communities: function(req, res) {
		// first find communities the user is a member of through the intermediary table
		CommunityMember
		.find({user: req.user.id})
		.then(function(members) {
			// pull community IDs from the CommunityMember Objects and pass it to Community find
			var comIDs = members.map(function(i) { return i.community; });
			Community
			.find(comIDs)
			.populate('tournaments')
			.populate('smashers')
			.then(function(communities) {
				// sort community tournaments by upload date
				for(var i = 0; i < communities.length; i++) {
					communities[i].tournaments.sort(function(x, y) { return x.createdAt > y.createdAt ? -1 : x.createdAt < y.createdAt ? 1 : 0; });
				}
				res.view('dashboard/communities', {communities: communities});
			})
		})
		.catch(function(err) {
			console.log(err);
			FlashService.error(req, 'Something went wrong.');
			res.redirect('back');
		});
	},

	// Ajax call that returns whether a user exists. Can search by e-mail or username
	checkUser: function(req, res) {
		UserService.doesExist(req.param('user'), function(err, doesExist, user) {
			if(err) return res.json(err);
			else if(doesExist) return res.json({ err: true, message: 'User ' + req.param('user') + ' already exists.' });
			else return res.json({ err: false, message: 'User ' + req.param('user') + ' does not exist. '});
		});
	},	
};
