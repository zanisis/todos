var express = require('express');
var router = express.Router();
const controller = require('../controllers/user');

/* GET users listing. */
router.post('/', controller.create);

module.exports = router;
