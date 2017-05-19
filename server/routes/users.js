var express = require('express');
var router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user');

/* GET users listing. */
// router.get('/', passport.authenticate('facebook'), controller.findOne);

module.exports = router;
