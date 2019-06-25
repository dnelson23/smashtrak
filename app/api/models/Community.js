/*
 * Community.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Community model to house basic community information
 */

module.exports = {
 	tableName: 'Community',

 	attributes: {
 		name: {
 			type: 'string',
 			required: true,
 			unique: false
 		},
 		// isPrivate is stored in the DB as 1 for private and 0 for public
 		isPrivate: {
 			type: 'number'
 		},
 		description: {
 			type: 'string',
 		},
 		members: {
 			collection: 'user',
 			via: 'community',
 			through: 'CommunityMember'
 		},
 		tournaments: {
 			collection: 'tournament',
 			via: 'community'
 		},
 		smashers: {
 			collection: 'smasher',
 			via: 'community'
 		},
 		createdBy: { type: 'number' },
 		updatedBy: { type: 'number' },
 	},

    // Model method that returns just the first 30chars of description
    shortDescription: function(c) {
        if(typeof(c) === 'object' && c.description) {
            return c.description.substring(0, 30);
        } else {
            return '';
        }
    }

}

