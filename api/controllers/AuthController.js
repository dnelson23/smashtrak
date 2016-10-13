/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	
	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

	login: function(req, res) {

		passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                FlashService.error(req, info.message);
                return res.redirect('back');
            }
            req.logIn(user, function(err) {
                if (err) {
                    res.negotiate(err);
                }
                FlashService.success(req, 'Logged in successfully.');
                return res.redirect('/');
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        FlashService.success(req, 'Logged out successfully');
        res.redirect('/');
    }
};

