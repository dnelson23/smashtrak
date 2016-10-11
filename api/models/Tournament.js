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
 		matches: {
 			collection: 'match',
 			via: 'tournament'
 		}
 	}
}
