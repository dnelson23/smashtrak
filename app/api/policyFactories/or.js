/**
 * Ability to check any count of policies in OR ordering
 * @author Yuriy Syedin <yura.syedin@gmail.com>
 * @returns {Function}
 */
module.exports = function () {
    var makeFakeForbidden = function (policies, p, req, res, next) {
        if (!policies[p + 1]) return res; // if there is no next policy, that should be verified - leave result as it is

        var customRes = {}; // init empty response object

        for (var i in res) {
            if (i === 'forbidden') {
                // override forbidden function for next policy
                customRes['forbidden'] = function () {
                    policies[p + 1](req, makeFakeForbidden(policies, p + 1, req, res, next), next); // call next policy with custom result
                }
            } else if (i == 'headerSent') { // fixing issue "...connect deprecated res.headerSent: use standard res.headersSent at api/policyFactories/or.js..."
                customRes['headersSent'] = res['headersSent'];
            } else {
                customRes[i] = res[i];
            }

        }

        return customRes;
    };
    // policies as arguments, that were passed
    var args = arguments.callee.arguments;

    return function (req, res, next) {
        // check first policy
        args[0](req, makeFakeForbidden(args, 0, req, res, next), next);
    }
};