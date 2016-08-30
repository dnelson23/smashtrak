module.exports = function addMessage (type, body) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  var obj = {type: type, body: body};

  if(!res.messages) {
  	res.messages = Array(obj);
  } else {
  	res.messages.push(obj);
  }
}