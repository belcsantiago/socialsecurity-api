var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET ocurrence types listing. */
router.get('/api/ocurrence-types', db.getAllOcurrenceTypes);
router.get('/api/ocurrence-types/:codigo_tipo_ocorrencia', db.getSingleOcurrenceType);
router.post('/api/ocurrence-types', db.createOcurrenceType);

module.exports = router;
