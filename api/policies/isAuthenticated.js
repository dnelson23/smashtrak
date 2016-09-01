module.exports = function(req, res, next) {
	if (req.isAuthenticated()) {
  	return next();
  }
  else {
  	req.session.messages['error'].push('You must be logged in to do that!');
    return res.redirect('/');
  }
};