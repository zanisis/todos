var express = require('express');
var router = express.Router();
const passport = require('passport');

const controller = require('../controllers/index');

/* GET home page. */
router.get('/login', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));
router.get('/auth/facebook', passport.authenticate('facebook'), controller.signIn_facebook)
// router.post('/auth/local', passport.authenticate('local'), controller.signIn_facebook)

router.get('/profile', (req, res, next) => {
    res.send('masuk profile')
})

router.get('/wrong', (req, res, next) => {
    res.send('wrong')
})


module.exports = router;



