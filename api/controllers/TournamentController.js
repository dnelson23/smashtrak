/**
 * TournamentController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Tournament Controller actions
 */

 module.exports = {

 	new: function(req, res) {
 		Community
 		.findOne(req.params.commID)
 		.then(function(community) {
 			res.view('tournament/new', { community: community });
 		})
 		.catch(function(err) {
 			res.negotiate(err);
 		});
 	},

 	pullTournament: function(req, res) {
 		var tSub = req.param('subdomain'),
 				tName = req.param('tournament'),
 				tType = req.param('type');

 		if(tSub) {
 			tourney = tSub + "-" + tName;
 		} else {
 			tourney = tName;
 		}

 		ChallongeService.getTournamentByName(tourney, function(err, response, body) {
 			if(err || response.statusCode != 200) {
  			console.log(err);	
  		}
  		var tObj = JSON.parse(body);
  		var localData = {
  					tournament: tObj.tournament,
  					matches: tObj.tournament.matches,
  					smashers: tObj.tournament.participants,
  					type: tType
  				};

  		res.view('tournament/upload', localData);
 		});
 	},

 	create: function(req, res) {

 	},
}
