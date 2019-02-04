/* SmasherController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Smasher Controller actions and ajax calls
 */

 module.exports = {

 	find: async function(req, res) {
		try {
			var smasher = await Smasher.findOne({ community: req.params.commID, tag: req.params.sTag })
			.populate('wins')
			.populate('losses')
			.populate('placings')
			.populate('community');

			// wins array
			for(var i = 0; i < smasher.wins.length; i ++) {
				smasher.wins[i] = await Match.findOne({ id: smasher.wins[i].id }).populate('winner').populate('loser').populate('tournament');
			}
			
			// losses array
			for(var i = 0; i < smasher.losses.length; i ++) {
				smasher.losses[i] = await Match.findOne({ id: smasher.losses[i].id }).populate('winner').populate('loser').populate('tournament');
			}

			// placings array
			for(var i = 0; i < smasher.placings.length; i++) {

				smasher.placings[i] = await Placing.findOne({ id: smasher.placings[i].id }).populate('tournament').populate('smasher');
			}

			return res.view('smasher/index', { smasher: smasher, community: smasher.community });
		} catch (err) {
			return res.negotiate(err);
		}
 	},

 	edit: function(req, res) {
 		return res.underConstruction(['Testing Data pass']);
 	},

 	doesExist: function(req, res) {
 		Smasher
 		.findOne({community: req.param('community'), tag: req.param('tag') })
 		.exec(function(err, smasher) {
 			if(err) console.log('Something went wrong looking up a smasher');

 			var ret = smasher ? { exists: true } : { exists: false };
 			console.log(ret);
 			return res.json(ret);
 		});
 	}
 }
