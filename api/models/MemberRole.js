/*
 * MemberRole.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @module			:: Model
 * @description	:: Member roles in relation to their communities
 */

module.exports = {
 	tableName: 'Member_Roles',
 	autoCreatedAt: false,
 	autoUpdatedAt: false,

 	attributes: {
 		role: {
 			type: 'string',
 			required: 'true',
 			unique: true
 		},
 		description: {
 			type: 'string'
 		}
 	}
}
