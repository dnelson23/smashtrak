/* SmasherController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Smasher Controller actions and ajax calls
 */

 module.exports = {

    /* GET: /c/{commID}/{sTag}
     * Displays a single smasher in given community
     */
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

    /* GET: /c/{commID}/{sTag}/edit
     * Displays smasher edit page
     */
    edit: async function(req, res) {
        var smashers = await Smasher.find({ community: req.params.commID })
            .populate("community");

        var smasher;
        for(var i = 0; i < smashers.length; i++) {
            var smasher = smashers[i];
            if(smasher == req.params.sTag) {
            } else {
                smashers.splice(1, i);
                break;
            }
        }

        if(smasher) {
            return res.view('smasher/edit', { smasher: smasher, existingSmashers: smashers.map(s => s.tag ), community: smasher.community });
        } else {
            return res.notFound();
        }
 	},

    /* POST: /c/{commID}/{sTag}
     * Updates a single smasher in given community
     */
    update: async function(req, res) {

        var smasher = await Smasher.findOne({ community: req.params.commID, id: req.params.sId })
            .populate("community"),
            newTag = req.param("tag");

        if(smasher) {
            try {
                var existingSmasher = await Smasher.findOne({ community: req.params.commID, tag: newTag });
                if(existingSmasher && existingSmasher.id != smasher.id) { // merge smashers
                    await Placing.update({ id: smasher.id }, { id: existingSmasher.id });
                    await Match.update({ winner: smasher.id }, { winner: smasher.id });
                    await Match.update({ loser: smasher.id }, { loser: smasher.id });
                    await Smasher.destroy({ id: smasher.id });
                    FlashService.success(req, "Smashers Merged");
                } else { // update tag
                    var updated = await Smasher.update(smasher.id, { tag: newTag });
                    console.log(updated);
                    if(updated) {
                        FlashService.success(req, "Smasher Updated");
                    } else {
                        FlashService.error(req, "Oops! There was an error updating that smasher");
                    }
                }
                
                return res.redirect(`/c/${ smasher.community.id }/smasher/${ newTag }/`);
            } catch(err) {
                console.log(err);
                FlashService.error(req, "Unknown Error");
            }
        }

        return res.view("smasher/index", { smasher: smasher, community: smasher.community });
    },

    /* GET: /smasher/doesExist
     * Returns true/false if smasher exists
     */
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
