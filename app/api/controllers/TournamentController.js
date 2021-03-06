/**
 * TournamentController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Tournament Controller actions
 */

 module.exports = {

    find: async function(req, res) {
        try {
            var tournament = await Tournament.findOne(req.params.tID).populate('community').populate('matches').populate('placings');
            if(tournament) {
                var smashers = [];
                tournament.matches.forEach(function(m) {
                if(smashers.indexOf(m.winner) == -1) smashers.push(m.winner);
                if(smashers.indexOf(m.loser) == -1) smashers.push(m.loser);
                });

                tournament.placings.sort(function(a, b) { return a.place - b.place });
                for(var i = 0; i < tournament.placings.length; i++) {
                    tournament.placings[i].smasher = await Smasher.findOne({ id: tournament.placings[i].smasher });
                };

                var s = await Smasher.find(smashers);

                return res.view('tournament/index', { tournament: tournament, smashers: s });
            } else {
                FlashService.error(req, "Could not find tournament");
            return res.redirect('back');
            }
        } catch(err) {
            console.log(err);
            return res.negotiate(err);
        }
    },

 	new: function(req, res) {
 		Community
 		.findOne(req.params.commID)
 		.then(function(community) {
 			return res.view('tournament/new', { community: community });
 		})
 		.catch(function(err) {
 			return res.negotiate(err);
 		});
 	},

 	pullTournament: function(req, res) {
 		var tSub = req.param('subdomain'),
 				tName = req.param('tournament');

 		if(!tName) {
      FlashService.error(req, "Tournament name is required.");
      res.redirect('back');
    } else if(tSub) {
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
            tName: tObj.tournament.name,
            tCommunity: req.params.commID,
            tType: "challonge",
            tDate: tObj.tournament.created_at,
            tUrl: tObj.tournament.full_challonge_url,
            matches: tObj.tournament.matches,
            smashers: tObj.tournament.participants
  				};

      // check to see if this tournament exists, if so redirect to it's view
      Tournament
      .findOne({ url: localData.tUrl })
      .then(function(tourney) {
        if(tourney) {
          FlashService.warning(req, 'That tournament has already been uploaded to this community');
          return res.redirect('/c/'+localData.tCommunity+'/tournament/'+tourney.id);
        } else {
          // else pull smashers already in the community and go to upload view
          Smasher
          .find( { community: req.params.commID })
          .then(function(smashers) {
            // add smashers tags to localData array
            localData.allSmashers = smashers.map(function(x) { return x.tag; });
            return res.view('tournament/upload', localData);
          })
          .catch(function(err) {
            return res.negotiate(err);
          });
        }
      })  
      .catch(function(err) {
        return res.negotiate(err);
      });
 		});
 	},

 	create: function(req, res) {
    var smashersParams = req.param('smashers'),
        matchesParams = req.param('matches'),
        communityID = req.params.commID,
        tournament = req.param('tournament');

    // add our created by keys before creating the tournament object
    tournament.createdBy = tournament.updatedBy = req.user.id;
    // create new tournament object before anything else
    Tournament
    .create(tournament)
    .exec(function(err, tourney) {
      if(err) return res.negotiate(err);
      
      // loop through our smasher parameters to find existing records
      // or create a new record if one doesn't already exist
      async.map(smashersParams, function iterator(smasher, mapCb) {
        Smasher
        .findOrCreate({ tag: smasher.tag, community: communityID }, 
                      { tag: smasher.tag, community: communityID, createdBy: req.user.id, updatedBy: req.user.id })
        .exec(function(err, s) {
          if(err) return mapCb(err);

          return mapCb(null, { challonge_id: smasher.id, smasher: s, placing: smasher.place });
        });
      }, function(err, smashers) {
        if(err) return res.negotiate(err);
        // begin creating the matches now that we have our smasher objects
        else {
          // link matches winner/loser with correct smasher object, add remaining required properties
          var matches = matchesParams.map(function(match) {
            for(var i = 0; i < smashers.length; i++) {
              match.winner = match.winner == smashers[i].challonge_id ? smashers[i].smasher.id : match.winner;
              match.loser = match.loser == smashers[i].challonge_id ? smashers[i].smasher.id : match.loser;
              match.tournament = tourney.id;
              match.createdBy = req.user.id;
              match.updatedBy = req.user.id;
            }
            return match;
          });

          // build our placings objects to create
          var placings = smashers.map(function(smasher) {
            return {
              tournament: tourney.id,
              smasher: smasher.smasher.id,
              place: smasher.placing,
              createdBy: req.user.id,
              updatedBy: req.user.id
            };
          });

          // finally commit the matches and placings and redirect to tournament
          Match
          .create(matchesParams)
          .then(function(mObjs) {
            Placing
            .create(placings)
            .then(function(pObjs) {
              return res.redirect('/c/' + tourney.community + '/tournament/' + tourney.id);
            })
            .catch(function(err) {
              if(err) return res.negotiate(err);
            });
          })
          .catch(function(err) {
            if(err) return res.negotiate(err);
          });
        }
      });
    });
 	},

  delete: async function(req, res) {
    var tournamentId = req.param("tID");
    var tDeleted = await Tournament.destroy({ id: tournamentId });
    var communityId = req.param("commID");

    if(tDeleted) {
      var pDeleted = await Placing.destroy({ tournament: tournamentId });
      var mDeleted = await Match.destroy({ tournament: tournamentId });
      FlashService.success(req, "Tournament deleted");
    } else {
      FlashService.success(req, "Could not find tournament to delete");
    }

    return res.redirect('/c/' + communityId);
  },
}
