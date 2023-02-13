const jwt = require('jsonwebtoken');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const User = require('../models/user.model');

const { GITHUB_APP_ID, GITHUB_APP_SECRET, SERVER_URL, TOKEN_KEY } = process.env;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_APP_ID,
      clientSecret: GITHUB_APP_SECRET,
      callbackURL: `${SERVER_URL}auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for the user in the database
        // console.log(profile);
        const { email, name, avatar_url, bio } = profile._json;
        let user = await User.findOne({ email });
        // If the user does not exist, create a new user
        if (!user) {
          user = new User({
            email,
            name,
            photo: avatar_url,
            bio,
            isAuthenticated: true,
            userType: 'github',
          });
          await user.save();
        }

        if (user.userType && user.userType !== 'github') {
          return done(null, false, { message: 'Email has already been used' });
        }

        // Return the user
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
