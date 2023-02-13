const jwt = require('jsonwebtoken');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user.model');

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, SERVER_URL, TOKEN_KEY } =
  process.env;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: `${SERVER_URL}auth/facebook/callback`,
      profileFields: [
        'id',
        'email',
        'name',
        'picture.type(large)',
        'gender',
        'link',
        'locale',
        'timezone',
        'updated_time',
        'verified',
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);
        const { email, name, picture, bio } = profile._json;
        // Look for the user in the database
        let user = await User.findOne({ email });
        // If the user does not exist, create a new user
        if (!user) {
          user = new User({
            email,
            name,
            photo: picture.data.url,
            bio,
            isAuthenticated: true,
            userType: 'facebook',
          });
          await user.save();
        }

        if (user.userType && user.userType !== 'facebook') {
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
