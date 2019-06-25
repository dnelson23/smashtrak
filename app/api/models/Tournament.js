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
 			required: true,
 			unique: false
 		},
 		community: {
 			model: 'community'
 		},
 		entrants: {
 			collection: 'smasher',
 			via: 'tournament',
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
 			isIn: ['challonge', 'smash.gg'],
 			required: true,
 		},
 		url: {
 			type: 'string',
 			required: true,
 		},
 		date: {
            type: 'string',
 			columnType: 'date'
 		},
 		createdBy: { type: 'number', required: true },
 		updatedBy: { type: 'number', required: true }
 	}
}
