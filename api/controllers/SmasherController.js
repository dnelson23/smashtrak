/**
 * SmasherController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Smasher Controller actions and ajax calls
 */

 module.exports = {

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