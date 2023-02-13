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
    passport.authenticate('login', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        // console.log('user logged in: ', req.user);
        return res.status(200).json({ token: info.token });
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

    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // console.log(req.user);
        return res.status(200).json({ token: info.token });
      });
    })(req, res, next);
  };

  logout = async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user._id, { isAuthenticated: false });
      req.logout(function (err) {
        if (err) {
          res.status(401).send('Logout failed: ' + err.message);
        } else {
          res.redirect('/');
        }
      });
    } catch (err) {
      res.status(401).send('Logout failed: ' + err.message);
    }
  };

  isAuthenticated = async (req, res, next) => {
    // Check for req.user for session-based authentication
    if (req.user && req.user.isAuthenticated) {
      return next();
    }

    // Check for JWT in the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      let user = await User.findById(decoded.user_id);
      if (!user.isAuthenticated) {
        return res.status(401).send('Unauthorized');
      }
      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  };

  loginWithGoogle = (req, res, next) => {
    // Authenticate the user
    passport.authenticate('google', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        // console.log('user logged in: ', req.user);
        return res.status(200).json({ token: info.token });
      });
    })(req, res, next);
  };

  loginWithGithub = (req, res, next) => {
    // Authenticate the user
    passport.authenticate('github', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        // console.log('user logged in: ', req.user);
        return res.status(200).json({ token: info.token });
      });
    })(req, res, next);
  };

  loginWithFacebook = (req, res, next) => {
    // Authenticate the user
    passport.authenticate('facebook', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        // console.log('user logged in: ', req.user);
        return res.status(200).json({ token: info.token });
      });
    })(req, res, next);
  };
}

module.exports = new AuthController();
