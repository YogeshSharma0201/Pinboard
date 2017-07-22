var AppHandler = require('../controllers/appHandler.js');

module.exports = function (app, passport) {
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    } else {
      res.json({status: 'forbidden'});
    }
  }

  app.get('/about', function(req, res, next) {
    res.send("<h1>about</h1>");
  });

  var appHandler = new AppHandler();

  app.route('/api/user')
    .get(function(req, res) {
      if(req.user) {
        res.json(req.user);
      } else {
        res.json({status: 'unauthenticated'});
      }
    });

  if(process.env.REMOVE_BROKEN === 'true'){
    app.route('/api/pics/restore')
      .get(appHandler.restoreBroken);
  }

  app.route('/api/pics')
    .get(appHandler.getAllPics)
    .post(isLoggedIn, appHandler.addPic);

  app.route('/api/pics/:id')
    .get(appHandler.getUserPics)
    .post(isLoggedIn, appHandler.likePic)
    .put(isLoggedIn, appHandler.unlikePic)
    .delete(isLoggedIn, appHandler.deletePic);

  if(process.env.REMOVE_BROKEN === 'true') {
    app.route('/api/pics/broken/:id')
      .put(appHandler.setBroken);
  }

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
  }));

  app.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    })
}
