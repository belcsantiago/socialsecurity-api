var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET users listing. */
router.get('/api/users', db.getAllUsers);
router.get('/api/users/codigo_usuario', db.getSingleUser);
router.post('/api/users', db.createUser);

module.exports = router;
