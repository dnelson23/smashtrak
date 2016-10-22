/*
 * isCommunityPublic.js
 * Drew Nelson
 * Aug 31 2016
 *
 * @module		:: Policy
 * @description :: Determines if the community is public or not
 */

module.exports = function(req, res, next) {
	Community
	.findOne(req.params.commID)
	.then(function(community) {
		if(community && !community.isPrivate) {
			return next();
		} else {
			return res.notFound();
		}
	})
	.catch(function(err) {
		return res.negotiate(err);
	});
};