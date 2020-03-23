const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Registration Strategy

passport.use(
  'local-registration',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        }
        var newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);

        newUser.save((err, savedUser) => {
          if (err) {
            return done(err);
          }
          return done(null, savedUser);
        });
      });
    }
  )
);

// Login Strategy

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user || !user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
