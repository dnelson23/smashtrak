/**
 * Route Mappings
 * (sails.config.routes)
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 */

module.exports.routes = {

  // Home Routes
  '/'         : 'HomeController.index',
  '/faq'      : 'HomeController.faq',

  // Auth Routes
  'post /login': 'AuthController.login',
  'post /logout': 'AuthController.logout',

  // User account Routes
  'post /register'                : 'UserController.create',
  'get /u/:username'              : 'UserController.edit',
  'post /u/:username'             : 'UserController.update',
  'get /u/:username/dashboard'    : 'UserController.communities',
  'get /u/:username/communities'  : 'UserController.communities',
  'get /u/checkUser'              : 'UserController.checkUser',

  // Community Routes
  'get /c/new'                : 'CommunityController.new',
  'post /c/new'               : 'CommunityController.create',
  'get /c/:commID'            : 'CommunityController.find',
  'get /c/:commID/edit'       : 'CommunityController.edit',
  'post /c/:commID/edit'      : 'CommunityController.update',
  'post /c/:commID/delete'    : 'CommunityController.delete',
  'post /c/:commID/addMember' : 'CommunityController.requestMember',

  // Tournament Routes
  'get /c/:commID/tournament/new'           : 'TournamentController.new',
  'post /c/:commID/tournament/new'          : 'TournamentController.pullTournament',
  'post /c/:commID/tournament/create'       : 'TournamentController.create',
  'get /c/:commID/tournament/:tID'          : 'TournamentController.find',
  'post /c/:commID/tournament/:tID/delete'  : 'TournamentController.delete',

  // Smashers Routes
  'get /c/:commID/smasher/:sTag'        : 'SmasherController.find',
  'get /c/:commID/smasher/:sTag/edit'   : 'SmasherController.edit',
  'post /c/:commID/smasher/:sId'        : 'SmasherController.update',
  'get /smashers/doesExist'             : 'SmasherController.doesExist',
};
