/*
 * UesrRole.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @module			:: Model
 * @description	:: Intermediate table for users roles
 */

 module.exports = {
 	tableName: 'User_Roles',

 	attributes: {
 		user: {
 			model: 'user'
 		},
 		role: {
 			model: 'memberrole'
 		},
 		updatedBy: {
 			type: 'int'
 		}
 	}
 }
