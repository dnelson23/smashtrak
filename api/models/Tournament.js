/*
 * Tournament.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Tournament model to store basic tournament information
 */

 module.exports = {
 	tableName: 'Tournaments',

 	attributes: {
 		name: {
 			type: 'string',
 			required: 'true',
 			unique: false
 		},
 		community: {
 			model: 'community'
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
 			type: 'datetime'
 		},
 		matches: {
 			collection: 'match',
 			via: 'tournament'
 		},
 		createdBy: { type: 'integer', required: true },
 		updatedBy: { type: 'integer', required: true }
 	}
}
