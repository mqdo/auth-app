const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user.model');

// Configure Passport.js
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.deserialize(id)
    .then((user) => {
      cb(null, user);
    })
    .catch((error) => {
      cb(error);
    });
});

class AuthController {
  constructor() {}
  login = (req, res, next) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' });
    }

    // Authenticate the user
    passport.authenticate('login', function (err, result, info) {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.status(401).send(info);
      }
      req.logIn(result.user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ token: result.token });
      });
    })(req, res, next);
  };
  signup = (req, res, next) => {
    const { email, password } = req.body;
    // console.log(email, password);

    // Validate user input
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' });
    }

    passport.authenticate('signup', (err, result, info) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.status(401).send(info);
      }
      req.logIn(result.user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ token: result.token });
      });
    })(req, res, next);
  };
  logout = (req, res) => {
    res.logout();
    res.redirect('/');
  }
  isAuthenticated() {}
  loginWithGoogle() {}
  loginWithGithub() {}
  loginWithFacebook() {}
  googleCallbacks() {}
  githubCallbacks() {}
  facebookCallbacks() {}
}

module.exports = new AuthController();
