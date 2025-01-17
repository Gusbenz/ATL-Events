var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../Models/User');
var config = require('../../oauth.js');

var strategy = new TwitterStrategy({
 consumerKey: config.twitter.consumerKey,
 consumerSecret: config.twitter.consumerSecret,
 callbackURL: config.twitter.callbackURL
},
function(accessToken, refreshToken, profile, done) {
User.findOne({ oauthID: profile.id }, function(err, user) {
 if(err) { console.log(err); }
 if (!err && user != null) {
   done(null, user);
 } else {
   var user = new User();
      user.twitter.oauthID = profile.id;
      user.twitter.username = profile.username;
      user.twitter.displayName = profile.displayName;
   user.save(function(err) {
     if(err) {
       console.log(err);
     } else {
       console.log("saving user ...");
       done(null, user);
     };
   });
 };
});
}
);

module.exports = strategy;
