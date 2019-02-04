/*
 * Match.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Model for recording individual set data
 */

 module.exports = {
 	tableName: 'Match',

 	attributes: {
 		winner: {
 			model: 'smasher'
 		},
 		loser: {
 			model: 'smasher'
 		},
 		tournament: {
 			model: 'tournament'
 		},
 		createdBy: { type: 'integer' },
 		updatedBy: { type: 'integer' }
 	}
 }
 