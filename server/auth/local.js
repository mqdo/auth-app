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
        let user = await User.findOneAndUpdate(
          { email: email.toLowerCase() },
          { isAuthenticated: true }
        );
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
              done(null, user, { token: token });
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
        let user = await User.findOne({ email: email });
        if (user) {
          return done(null, false, { message: 'Email has already been used' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email: email.toLowerCase(),
          password: hashedPassword,
          photo: `${process.env.SERVER_URL}photo/default.png`,
          isAuthenticated: true,
        });
        await newUser.save();
        const token = jwt.sign({ user_id: newUser._id }, process.env.TOKEN_KEY, {
          expiresIn: '5h',
        });
        done(null, user, { token: token });
      } catch (err) {
        done(err, false, { message: 'Error during authentication' });
      }
    }
  )
);
