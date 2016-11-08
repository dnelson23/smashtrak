/**
 * Under Construction Response
 *
 * Sends a 200 response and directs to an under construction view.
 *
 * Usage:
 * return res.underConstruction();
 * return res.underConstruction(data);
 *
 * @param  {[String]} data
 *					- Array of messages to display, if any
 */

module.exports = function underConstruction(data, options) {

	// Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(200);

  return res.view('construction', { data: data });
};