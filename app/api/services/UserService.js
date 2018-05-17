/*
 * UserService.js
 * Drew Nelson
 * Nov 10 2016
 *
 * @module			:: Service
 * @description :: Helper functions for User
 */

module.exports = {
  doesExist: function(userToFind, cb) {
    User
    .findOne({or: [{ username: userToFind }, { email: userToFind }]})
    .then(function(u) {
      if(!u) cb(null, false, null);
      else cb(null, true, u);
    })
    .catch(function(err) {
      console.log(err);
      cb({ err: true, message: 'Something went wrong searching for user.' }, null, null);
    });
  }
}