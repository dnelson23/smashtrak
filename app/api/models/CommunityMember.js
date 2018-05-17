/*
 * CommunityMember.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @module			:: Model
 * @description	:: Community Member model for member information
 */

module.exports = {
 	tableName: 'Community_Members',

 	attributes: {
 		community: {
 			model: 'community'
 		},
 		user: {
 			model: 'user'
 		},
 		role: {
 			model: 'memberrole'
 		},
 		status: {
 			type: 'string',
 			enum: ['pending', 'accepted']
 		},
 		createdBy: { type: 'integer' },
 		updatedBy: { type: 'integer' }
 	}
}
