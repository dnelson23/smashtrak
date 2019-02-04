/*
 * Tournament.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Tournament model to store basic tournament information
 */

 module.exports = {
 	tableName: 'Tournament',

 	attributes: {
 		name: {
 			type: 'string',
 			required: 'true',
 			unique: false
 		},
 		community: {
 			model: 'community'
 		},
 		entrants: {
 			collection: 'smasher',
 			via: 'smasher',
 			through: 'placing'
 		},
 		matches: {
 			collection: 'match',
 			via: 'tournament'
 		},
		placings: {
			collection: 'placing',
			via: 'tournament'
		},
 		type: {
 			type: 'string',
 			enum: ['challonge', 'smash.gg'],
 			required: 'true',
 		},
 		url: {
 			type: 'string',
 			required: 'true',
 		},
 		date: {
 			type: 'date'
 		},
 		createdBy: { type: 'integer', required: true },
 		updatedBy: { type: 'integer', required: true }
 	}
}
