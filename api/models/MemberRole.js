/*
 * MemberRole.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Member roles in relation to their communities
 */

 module.exports = {
 	tableName: 'Member_Roles',

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
