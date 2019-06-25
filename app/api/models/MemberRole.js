/*
 * MemberRole.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @module		:: Model
 * @description	:: Member roles in relation to their communities
 */

module.exports = {
 	tableName: 'MemberRole',

 	attributes: {
 		type: {
 			type: 'string',
 			columnName: 'role',
 			required: true,
 			unique: true
 		},
 		description: {
 			type: 'string'
		},
        createdAt: false,
        updatedAt: false,
 	},

    // Model method to return if role type is an admin
    isAdmin: function(mr) {
        return mr.type == 'Admin' || mr.type == 'SuperUser';
    }
}
