/*
 * CommunityMember.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @module			:: Model
 * @description	:: Community Member model for member information
 */

module.exports = {
 	tableName: 'CommunityMember',

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
 			isIn: ['pending', 'accepted']
 		},
 		createdBy: { type: 'number' },
 		updatedBy: { type: 'number' }
 	}
}
