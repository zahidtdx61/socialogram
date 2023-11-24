const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router Loaded');

router.get('/', homeController.home);
router.use('/user', require('./user'));

// for any further routes, access for here
// router.use('/routerName', requre('./routerFile'));

module.exports = router;