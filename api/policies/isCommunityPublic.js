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
		if(community.isPrivate) {
			return res.notFound();
		} else {
			return next();
		}
	})
	.catch(function(err) {
		res.negotiate(err);
	});
};