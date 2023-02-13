const express = require('express');
const passport = require('passport');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', controller.login);

router.post('/signup', controller.signup);

router.get('/logout', controller.isAuthenticated, controller.logout);

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', controller.loginWithGoogle);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get('/facebook/callback', controller.loginWithFacebook);

router.get(
  '/github',
  passport.authenticate('github', { scope: ['read:user', 'user:email'] })
);

router.get('/github/callback', controller.loginWithGithub);

module.exports = router;
