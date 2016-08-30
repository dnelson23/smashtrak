/*
 * CommunityMember.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Community model to house basic community information
 */

 module.exports = {
 	tableName: 'Community_Members',

 	attributes: {
 		community: {
 			model: 'community'
 		},
 		user: {
 			model: 'user'
 		}
 	}
 }
