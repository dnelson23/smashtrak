/*
 * ChallongeService.js
 * Drew Nelson
 * Oct 17 2016
 *
 * @module			:: Service
 * @description :: Helper functions for Challonge API
 */

var request = require('request');

module.exports = {
  getTournamentByName: function(tourneyString, cb) {
  	var url = "https://api.challonge.com/v1/tournaments/" + tourneyString + ".json",
  			queryString = { 
  				api_key : process.env.CHALLONGE_API_KEY,
  				tournament: tourneyString,
  				include_participants: 1,
  				include_matches: 1
  			},
  			tReturn;

  	request({ url: url, qs: queryString }, cb);
  }
}