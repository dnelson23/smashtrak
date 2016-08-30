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
	}
};

