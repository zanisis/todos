var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var findOrCreate = require('mongoose-findorcreate')
var cors = require('cors');
const passport = require('passport');
const StrategyLocal = require('passport-local').Strategy;
const StrategyFacebook = require('passport-facebook').Strategy;

require('dotenv').config()


var index = require('./routes/index');
var users = require('./routes/users');
// var todo = require('./routes/todo');

//connection to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos_fancy');
var User = require('./models/users');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var fbOpts = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook",
    profileFields: ['displayName','name', 'email']
};

var fbCallback = function(Token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {
            console.log('ini Token ---', Token);
            console.log('ini refreshToken ---', refreshToken);
            profile.token = Token
            return done(null, profile)
            // console.log('ini profile ---', profile);
            // User.findOne({
            //         'facebook_id' : profile.id
            //     }, function(err, user) {
            //       // console.log('ini user ---', user);
            //       // console.log('ini error ---', err);
            //       if(err) return done(err)
            //         if (user) {
            //             return done(null, user) // user found, return  that user
            //         } else {
            //           return done(null, profile)
                        // var newUser = new User()
                        //
                        // newUser.facebook_id = profile.id;
                        // newUser.username = profile.name.givenName;
                        // newUser.email = profile.emails[0].value;
                        // newUser.facebook_token = Token;
                        // newUser.password = profile.name.givenName
                        //
                        //
                        // // console.log('data baru',newUser);
                        // newUser.save((err)=>{
                        //   if(err) throw err
                        //   // console.log('ini result', result);
                        //   return done (null, result)
                        // })

                        // promise.then((doc)=>{
                        //   console.log('ini doc', doc);
                        // })
                    // }
                  // })
    })
}

passport.use(new StrategyFacebook(fbOpts, fbCallback))

passport.use(new StrategyLocal(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
            if (!user) {
            return done(null, { message: 'Username Not Found You Must Register' });
            }
            if (!passwordHash.verify(password, user.password)) {
            return done(null, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
  }
));

var app = express();
app.use(passport.initialize());
app.use(cors())

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin","*")
//   next()
// })

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// app.use('/todo', todo);

// https://graph.facebook.com/oauth/client_code?access_token=EAAFMHC8mae8BAPZBZBHHOZBzdA2PZBGEwGJ5h8ueXK92cYAJVWPpFaSV032L9ajKBkIs13d0DB8KAjTrCGobmfkKnLFnaKusU5vyR5TdFiSBl9pqMpH1DA0aXvRIhYOm1uBHlI5L5LgcTC5SngwAEdCvOgvzZCmFuJXnRj4C4MwZDZD&amp;client_secret=fe65edd554aeb30b2ae4451cec5a289c&amp;redirect_uri=http://localhost:3000/&amp;client_id=365158910552559
// https://graph.facebook.com/endpoint?key=value&amp;access_token=365158910552559

module.exports = app;