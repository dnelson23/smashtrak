/*
 * isCurrentUser.js
 * Drew Nelson
 * Aug 31 2016
 *
 * @module		:: Policy
 * @description :: Authenticates a user against a requested url
 */

module.exports = function(req, res, next) {
	if(req.param('username') != req.user.username) {
		console.log('username does not match');
		return res.forbidden('You do not have access to this page');
	}

	next();
};