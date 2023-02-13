const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let user = await User.findOne({ email: email.toLowerCase() });
        // If the email and password do not match, call done with false
        if (!user) {
          done(null, false, { message: 'User do not existed' });
        } else {
          bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
              // If the email and password match, create a token and call done with the user and token
              const token = jwt.sign(
                { user_id: user._id },
                process.env.TOKEN_KEY,
                {
                  expiresIn: '5h',
                }
              );
              done(null, { user, token });
            } else {
              done(error, false, { message: 'Password mismatch' });
            }
          });
        }
      } catch (err) {
        done(err, false, { message: 'Error during authentication' });
      }
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          email: email.toLowerCase(),
          password: hashedPassword,
        });
        await user.save();
        const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: '5h',
        });
        done(null, { user, token });
      } catch (err) {
        done(err, false, { message: 'Error during authentication' });
      }
    }
  )
);
