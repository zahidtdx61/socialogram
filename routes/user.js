const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/user/sign-in' }
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

module.exports = router;