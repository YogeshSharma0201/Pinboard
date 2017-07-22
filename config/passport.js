var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./../models/users');

function updatePic (profile, user, done) {
  if (profile.photos[0].value === user.twitter.imageUrl){
    return done(null, user);
  } else {
    user.twitter.imageUrl = profile.photos[0].value;
    user.save (function(err) {
      if(err){
        throw err;
      }
      return done(null, user);
    })
  }
}
module.exports = function (passport) {
  passport.serializeUser (function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser (function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.ROOT_URL? process.env.ROOT_URL+"/auth/twitter/callback" : "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({'twitter.id': profile.id}, function(err, user) {
        if (err) { return done(err); }

        if(user) {
          return updatePic(profile, user, done);
        } else {
          var newUser = new User();
          newUser.twitter.id = profile.id;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;
          newUser.twitter.imageUrl = profile.photos[0].value;

          newUser.save(function (err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          })
        }
      });
    }
  ));

}
