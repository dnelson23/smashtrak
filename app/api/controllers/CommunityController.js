/**
 * CommunityController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Community Controller actions
 */

 module.exports = {

 	// GET '/c/:commID'
 	find: function(req, res) {
 		Community
 		.findOne(req.params.commID)
 		.populate('tournaments')
 		.populate('smashers')
 		.then(function(community) {
 			if(community) {
 				community = community.toObject(); // this lets us replace associations once we manually find and populate them
 				// we only need the number of entrants for each tournaments but we have to retrieve them manually
 				async.map(community.tournaments, function(tournament, mapCb) {
 					Tournament
 					.findOne(tournament.id)
 					.populate('entrants')
 					.exec(function(err, t) {
 						if(err) return mapCb(err);
 						return mapCb(null, t);
 					});
 				}, function(err, tournaments) {
 					if(err) return res.negotiate(err);

 					community.tournaments = tournaments ? tournaments : [];
 					// now find our smashers
	 				async.map(community.smashers, function(smasher, mapCb) {
		 				Smasher
		 				.findOne(smasher.id)
		 				.populate('wins')
		 				.populate('losses')
		 				.exec(function(err, s) {
		 					if(err) return mapCb(err);
		 					return mapCb(null, s);
		 				});
		 			}, function(err, smashers) {
		 				if(err) return res.negotiate(err);
		 				
		 				community.smashers = smashers ? smashers : [];
		 				return res.view('community/index', { community: community, role: res.locals.role });
		 			});
 				});
	 		} else {
	 			return res.notFound(undefined, { description: 'Could not find that community.' });
	 		}
 		})
		.catch(function(err) {
			res.negotiate(err);
		});
 	},

 	// GET '/c/new'
 	new: function(req, res) {
 		return res.view('community/new');
 	},

 	/* POST '/c/new'
 	 * @param {String} name
 	 * @param {String} description
 	 */
 	create: function(req, res) {
 		var commParams = {
 			name: req.param('name'),
 			description: req.param('description'),
 			createdBy: req.user.id,
 			updatedBy: req.user.id
 		};

 		// create the community, add creating user as an admin and load community view
 		Community
 		.create(commParams)
 		.then(function(comm) {
 			var memberParams = {
 				community: comm.id,
 				user: req.user.id,
 				role: 2,
 				createdBy: req.user.id,
 				updatedBy: req.user.id
 			};

 			CommunityMember
 			.create(memberParams)
 			.then(function(member) {
 				return res.redirect('/c/'+comm.id);
 			})
 			.catch(function(err) {
 				return res.negotiate(err)
 			});
 		})
 		.catch(function(err) {
 			return res.negotiate(err);
 		});
 	},

 	// GET '/c/:commID/edit'
 	edit: function(req, res) {
 		Community
 		.findOne(req.params.commID)
 		.exec(function(err, c) {
 			if(err) return res.negotiate(err);

 			if(c) {
	 			MemberRole
	 			.find()
	 			.exec(function(err, roles) {
	 				if(err) return res.negotiate(err);

	 				return res.view('community/edit', { community: c, roles: roles.splice(1) });
	 			});
	 		} else return res.notFound(undefined, 'Could not find that community');
 		});
 	},

 	/* POST '/c/:commID/edit'
 	 *
 	 * @param {String} name
 	 * @param {String} description
 	 */
 	update: function(req, res) {
 		Community
 		.findOne(req.params.commID)
 		.exec(function(err, c) {
 			if(err) return res.negotiate(err);

 			if(c) {
 				c.name = req.param('name');
 				c.description = req.param('description');
 				c.updatedBy = req.user.id;
 				c.save(function(err) {
 					if(err) return res.negotiate(err);

 					FlashService.success(req, 'Community updated successfully.');
 					return res.redirect('/c/' + c.id + '/edit');
 				});
 			} else {
 				return res.notFound();
 			}
 		})
 	},

 	// DELETE '/c/:commID/edit'
 	delete: function(req, res) {
 		Community
 		.destroy(req.params.commID)
 		.exec(function(err) {
 			if(err) return res.negotiate(err);
 			FlashService.success(req, 'Community has been deleted successfully');
 			return res.redirect('/u/' + req.user.username + '/dashboard');
 		});
 	},

 	// Ajax call that attempts to send a member request to a user
 	requestMember: function(req, res) {
 		UserService.doesExist(req.param('user'), function(err, doesExist, user) {
 			if(err) return res.json({ err: true, message: err.message });
 			else if(!doesExist) return res.json({ err: true, message: 'User ' + req.param('user') + ' does not exist.' });
 			else {
 				var cBy = uBy = req.user.id;
	 			CommunityMember
	 			.findOrCreate({ community: req.param('community'), user: user.id, role: req.param('role') },
	 										{ community: req.param('community'), user: user.id, role: req.param('role'), createdBy: cBy, updatedBy: uBy })
	 			.exec(function(err, cMember) {
	 				if(err) return res.json({ err: true, message: 'Something went wrong while adding the user.' });
	 				else if(cMember.createdAt.toString() != new Date().toString())
	 					return res.json({ err: true, message: 'That user is already a member of the community with that role.' });
	 				else return res.json({ success: true, message: 'Request sent to ' + req.param('user') + '.' });
	 			});
 			}
 		});
 	},
}
