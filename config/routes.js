/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
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
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/'         : 'HomeController.index',
  '/faq'      : 'HomeController.faq',

  'post /login': 'AuthController.login',

  'post /logout': 'AuthController.logout',

  'post /register' : 'UserController.create',

  // User account Routes
  'get /u/:username'              : 'UserController.edit',
  'post /u/:username'             : 'UserController.update',
  'get /u/:username/dashboard'    : 'UserController.dashboard',
  'get /u/:username/communities'  : 'UserController.communities',

  // Community/Tournament Routes
  'get /c/:commID'                    : 'CommunityController.find',
  'get /c/:commID/tournament/new'     : 'TournamentController.new',
  'post /c/:commID/tournament/new'    : 'TournamentController.pullTournament',
  'post /c/:commID/tournament/create' : 'TournamentController.create',
  'get /c/:commID/tournament/:tID'    : 'TournamentController.show',
};
