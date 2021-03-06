const LogRequest = require('../utils/logRequest.js');

module.exports = function notImplement (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(404);

  // Log request
  LogRequest(req, res);

  return res.jsonx({status: 404, msg: 'Interface not implement'});
};