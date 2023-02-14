const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user.model');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_URL, TOKEN_KEY } =
  process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}auth/google/callback`,
      authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Query the database to see if the user already exists
        // console.log(profile);
        const user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If the user does not exist, create a new user
          const user = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            photo: profile.photos[0].value || `${SERVER_URL}photo/default.png`,
            isAuthenticated: true,
            userType: 'google',
          });

          await user.save();
        }

        if (user.userType && user?.userType !== 'google') {
          return done(null, false, { message: 'Email has already been used' });
        }

        user.isAuthenticated = true;

        user.save();

        const token = jwt.sign({ user_id: user._id }, TOKEN_KEY, {
          expiresIn: '5h',
        });
        return done(null, user, { token: token });
      } catch (error) {
        return done(error, false, { message: 'Error during authentication' });
      }
    }
  )
);
