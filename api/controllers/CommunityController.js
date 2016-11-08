/**
 * CommunityController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Community Controller actions
 */

 module.exports = {

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

 	new: function(req, res) {
 		return res.view('community/new');
 	},

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

 	addMember: function(req, res) {
 		User
 		.findOne({or: [{ username: req.param('user') }, { email: req.param('user') }]})
 		.then(function(u) {
 			if(!u) return res.json({ err: true, message: 'Could not find user ' + req.param('user') + '.' });

 			var cBy = uBy = req.user.id;
 			CommunityMember
 			.create({ community: req.param('community'), user: u.id, role: req.param('role'), createdBy: cBy, updatedBy: uBy })
 			.exec(function(err, cMember) {
 				if(err || !cMember) return res.json({ err: true, message: 'Something went wrong while adding the user.' });
 				else return res.json({ success: true });
 			});
 		})
 		.catch(function(err) {
 			return res.json({ err: true, message: 'Something went wrong while adding the user.' });
 		})
 	},
}
