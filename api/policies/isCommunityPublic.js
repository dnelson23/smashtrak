/*
 * isCommunityPublic.js
 * Drew Nelson
 * Aug 31 2016
 *
 * @module		:: Policy
 * @description :: Determines if the community is public or not
 */

module.exports = function(req, res, next) {
	Community.findOne({id: req.param('community')}).exec(function(err, com) {
		if(community.isPrivate) {
			return res.notFound();
		}
	});
};