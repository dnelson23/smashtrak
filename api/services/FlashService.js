/*
 * FlashService.js
 * Drew Nelson
 * Aug 30 2016
 *
 * @module			:: Service
 * @description :: Functions to add client side alerts messages
 *							:: NOTE: These functions only work in controllers
 *							::       To display an alert before the service is loaded (i.e. from a policy) use req.session.[type].push('message')
 */

module.exports = {
  success: function(req, message) {
    req.session.messages['success'].push(message);
  },
  warning: function(req, message) { 
    req.session.messages['warning'].push(message);
  },   
  error: function(req, message) {
    req.session.messages['error'].push(message);
  }
}