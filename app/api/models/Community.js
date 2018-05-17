/*
 * Community.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Community model to house basic community information
 */

 module.exports = {
 	tableName: 'Communities',

 	attributes: {
 		name: {
 			type: 'string',
 			required: 'true',
 			unique: false
 		},
 		// isPrivate is stored in the DB as 1 for private and 0 for public
 		isPrivate: {
 			type: 'int'
 		},
 		description: {
 			type: 'string',
 		},
 		members: {
 			collection: 'user',
 			via: 'user',
 			through: 'communitymember'
 		},
 		tournaments: {
 			collection: 'tournament',
 			via: 'community'
 		},
 		smashers: {
 			collection: 'smasher',
 			via: 'community'
 		},
 		createdBy: { type: 'integer' },
 		updatedBy: { type: 'integer' },
 		shortDescription: function() {
 			return this.description.substring(0, 30);
 		}
 	}
 }
