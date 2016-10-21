/*
 * SmashLogService.js
 * Drew Nelson
 * Oct 19 2016
 *
 * @module			:: Service
 * @description :: Custom Logging functions
 *              :: Cuts down on unnecessarily lengthy logging and error calls in controllers
 */

module.exports = {

  /**
   * Tournament Upload Error logging
   *
   * @param   {object}  User object that encountered the error
   * @param   {string}  More speciic detail of error
   * @return  {res}     Returns a 500 server error via res.serverError   
   */
  TournamentUploadErr: function(user, errorStr) {
    sails.log.error('User %user.id, %user.username tournament upload failed: ' + errorStr + '. Sending 500');
    res.serverError('There was a problem processing tournament data. Try uploading the tournamnet again. If the problem persists you can contact support for help.');
  },
}