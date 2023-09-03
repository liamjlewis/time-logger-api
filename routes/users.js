var express = require('express');
var router = express.Router();

let mockUsers = require('../dummy-data/users.json');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json( mockUsers )
});

module.exports = router;
