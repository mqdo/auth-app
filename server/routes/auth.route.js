const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', controller.login);

router.post('/signup', controller.signup);

router.get('/logout', controller.logout);

router.get('/google', controller.loginWithGoogle);

router.get('/google/callback', controller.googleCallbacks);

router.get('/facebook', controller.loginWithFacebook);

router.get('/facebook/callback', controller.facebookCallbacks);

router.get('/github', controller.loginWithGithub);

router.get('/github/callback', controller.githubCallbacks);

module.exports = router;
