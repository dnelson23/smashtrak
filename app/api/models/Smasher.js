/*
 * Smasher.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Smasher model for storing player data
 */

module.exports = {
 	tableName: 'Smasher',

 	attributes: {
 		tag: {
 			type: 'string',
 			required: true
 		},
 		wins: {
 			collection: 'match',
 			via: 'winner'
 		},
 		losses: {
 			collection: 'match',
 			via: 'loser'
 		},
 		community: {
 			model: 'community'
 		},
 		placings: {
 			collection: 'placing',
 			via: 'smasher'
 		},
        tournaments: {
            collection: 'tournament',
            via: 'smasher',
            through: 'placing'
        },
 		createdBy: { type: 'number' },
 		updatedBy: { type: 'number' },
 	},
}
