/**
 * SmasherController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Smasher Controller actions and ajax calls
 */

 module.exports = {

 	find: function(req, res) {
 		Smasher
 		.findOne({ community: req.params.commID, tag: req.params.sTag })
 		.populate('wins')
 		.populate('losses')
 		.populate('placings')
 		.populate('community')
 		.then(function(smasher) {
 			if(smasher) {
 				smasher = smasher.toObject();
 				// complete all associated models and replace them
 				async.map(smasher.wins, function(win, mapCb) {
 					Match
 					.findOne(win.id)
 					.populate('winner')
 					.populate('loser')
 					.populate('tournament')
 					.exec(function(err, win) {
 						if(err) return mapCb(err);
 						return mapCb(null, win);
 					});
 				}, function(err, wins) {
 					if(err) return res.negotiate(err);

 					smasher.wins = wins ? wins : [];
 					// populate losses
 					async.map(smasher.losses, function(loss, mapCb) {
 						Match
 						.findOne(loss.id)
 						.populate('winner')
 						.populate('loser')
 						.populate('tournament')
 						.exec(function(err, loss) {
 							if(err) return mapCb(err);
 							return mapCb(null, loss);
 						});
 					}, function(err, losses) {
 						if(err) return res.negotiate(err);

 						smasher.losses = losses ? losses : [];
 						// populate placings
 						async.map(smasher.placings, function(placing, mapCb) {
 							Placing
 							.findOne(placing.id)
 							.populate('smasher')
 							.populate('tournament')
 							.exec(function(err, place) {
 								if(err) return mapCb(err);
 								return mapCb(null, place);
 							});
 						}, function(err, placings) {
 							if(err) return res.negotiate(err);

 							// Sort tournaments by smashers placing
 							placings.sort(function(x, y) { return x.place - y.place; });
 							smasher.placings = placings ? placings : [];
 							return res.view('smasher/index', { smasher: smasher, community: smasher.community });
 						});
 					});
 				});
 			} else {
 				return res.notFound('Could not find smasher');
 			}
 		})
 		.catch(function(err) {
 			return res.negotiate(err);
 		});
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