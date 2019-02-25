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

    edit: async function(req, res) {
        var smasher = await Smasher.findOne({ community: req.params.commID, tag: req.params.sTag })
            .populate("community");

        return res.view('smasher/edit', { smasher: smasher, community: smasher.community });
 	},

    update: async function(req, res) {

        var smasher = await Smasher.findOne({ community: req.params.commID, id: req.params.sId })
            .populate("community"),
            newTag = req.param("tag");

        if(smasher) {
            try {
                var updated = await Smasher.update(smasher.id, { tag: newTag });
                console.log(updated);
                if(updated) {
                    FlashService.success(req, "Smasher Updated");
                    return res.redirect(`/c/${ smasher.community.id }/smasher/${ newTag }a/`);
                } else {
                    FlashService.error(req, "Oops! There was an error updating that smasher");
                }
            } catch(err) {
                console.log(err);
                FlashService.error(req, "Unknown Error");
            }
        }

        return res.view("smasher/index", { smasher: smasher, community: smasher.community });
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
