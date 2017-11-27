var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET ocurrences listing. */
router.get('/api/ocurrences', db.getAllOcurrences);
router.get('/api/ocurrences/:codigo_ocorrencia', db.getSingleOcurrence);
router.get('/api/ocurrences/getType/:codigo_tipo_ocorrencia', db.getOcurrencePerTypes)
router.post('/api/ocurrences', db.createOcurrence);

module.exports = router;