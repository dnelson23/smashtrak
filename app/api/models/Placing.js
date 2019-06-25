/*
 * Placing.js
 * Drew Nelson
 * Oct 31 2016
 *
 * @description: Model for recording tournament placings for smashers
 */

module.exports = {
 	tableName: 'Placing',

 	attributes: {
 		place: {
 			type: 'number',
 			required: true
 		},
 		tournament: {
 			model: 'tournament'
 		},
 		smasher: {
 			model: 'smasher'
 		},
 		createdBy: { type: 'number' },
 		updatedBy: { type: 'number' }
 	}
}
 
