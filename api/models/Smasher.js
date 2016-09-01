/*
 * Smasher.js
 * Drew Nelson
 * Aug 29 2016
 *
 * @description: Smasher model for storing player data
 */

module.exports = {
 	tableName: 'Smashers',

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
 		sets: function() {
 			Match.find({or: [{winner_id: this.id}, {loser_id: this.id}]}).exec(function(err, retSets) {
 				if(err) {
 					return res.negotiate(err);
 				} else {
 					return retSets;
 				}
 			});
 		},
	 	tournaments: function() {
	 		var tourneys = Array();
	 		for(var set in this.sets) {
	 			if(!tourneys.includes(set)) {
	 				tourneys.push(set);
	 			}
	 		}
	 		return tourneys;
	 	}
 	},
}