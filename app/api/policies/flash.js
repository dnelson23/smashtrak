/*
 * flash.js
 * Drew Nelson
 * Aug 30 2016
 * 
 * @module			:: Policy
 * @description :: Stores and carries client side alert messages from one request to the next
 								:: Used in conjunction with FlashService.js, displayed with the default alerts partial
 */

module.exports = function(req, res, next) {
  res.locals.messages = { success: [], error: [], warning: [] };

  if(!req.session.messages) {
    req.session.messages = { success: [], error: [], warning: [] };
    return next();
  }
  res.locals.messages = _.clone(req.session.messages);

  // Clear flash
  req.session.messages = { success: [], error: [], warning: [] };
  return next();
};
