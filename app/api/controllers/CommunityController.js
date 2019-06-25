/**
 * CommunityController.js
 * Drew Nelson
 * Oct 13 2016
 *
 * @description :: Community Controller actions
 */

 module.exports = {

 	// GET '/c/:commID'
 	find: async function(req, res) {
 		var community = await Community.findOne(req.params.commID)

        if(community) {
            // get tournaments manually to populate entrants
            community.tournaments = await Tournament.find({ community: community.id })
                .populate('entrants');

            // get smashers to populate wins and losses
            community.smashers = await Smasher.find({ community: community.id })
                .populate('wins')
                .populate('losses');

            return res.view('community/index', { community: community, role: res.locals.role });
        } else {
            return res.notFound(undefined, { description: 'Could not find that community.' });
        }
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
 				status: 'pending',
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
 	edit: async function(req, res) {
 		var community = await Community.findOne(req.params.commID);

        if(community) {
            // if user is an admin or superuser fill also add community members
            var members = await CommunityMember.find({ community: community.id })
                .populate('user')
                .populate('role');

            if(res.locals.role.type != 'SuperUser') {
                members = members.filter(x => x.role != 1);
            }

            var roles = await MemberRole.find();

	        return res.view('community/edit', { community: community, members: members, roles: roles.splice(1) });

        } else return res.notFound(undefined, 'Could not find that community');
 	},

 	/* POST '/c/:commID/edit'
 	 *
 	 * @param {String} name
 	 * @param {String} description
 	 */
    update: async function(req, res) {
 		var c = Community.findOne(req.params.commID)
        if(!c) {
            return res.notFound();
        }

        c.name = req.param('name');
        c.description = req.param('description');
        c.updatedBy = req.user.id;
        var cAfterUpdate = await Community.update(c);
        c.save(function(err) {
            if(err) return res.negotiate(err);

            FlashService.success(req, 'Community updated successfully.');
            return res.redirect('/c/' + c.id + '/edit');
        });
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

    // GET '/c/:commID/member/:memberID'
    findMember: async function(req, res) {
        var community = await Community.findOne({ id: req.params.commID });
        var member = await CommunityMember.findOne({ id: req.params.memberID })
            .populate('user');
        var roles = await MemberRole.find();

        return res.view('community/member', { community: community, member: member, roles: roles });
    },

    // POST '/c/:commID/member/:memberID'
    updateMember: async function(req, res) {
        var member = await CommunityMember.findOne({ id: req.params.memberID });

        if(member) {
            member.role = parseInt(req.param('role'));

            var memberAfterUpdate = await CommunityMember.updateOne(member.id, { role: member.role });

            if(memberAfterUpdate.role == member.role) {
                FlashService.success(req, 'Member updated successfully!');
            } else {
                FlashService.error(req, 'There was a problem updating the member');
            }
            return res.redirect('/c/' + req.params.commID + '/member/' + member.id);
        } else return res.notFound();
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
