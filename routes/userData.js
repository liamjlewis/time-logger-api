var express = require('express');
var router = express.Router();

let mockUsers = require('../dummy-data/user-data.json');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  if (!req.body.id) {
    res.status(400).send('user id is required')
  } else {
    const userData = mockUsers[req.body.id];
    if (!!userData) {
      res.json( userData )
    } else {
      res.status(404).send('user not found')
    }
  }
});

/* DELETE a user's workUnit. */
router.delete('/workUnit', async function(req, res, next) {
  if (!req.body.id) {
    res.status(400).send('id of workUnit is required')
  } else {
    // for now just pretend to delete the work unit since we're not using a real database yet
    res.status(200).send();
  }
});
/* create a workUnit. */
router.post('/workUnit', async function(req, res, next) {
  if (!req.body.id) {
    res.status(400).send('workUnit object is required in request body')
  } else {
    // for now just pretend to add the work unit since we're not using a real database yet
    res.status(201).send();
  }
});

/* DELETE a user's workDay. */
router.delete('/workDay', async function(req, res, next) {
  if (!req.body.id) {
    res.status(400).send('id of workDay is required')
  } else {
    // for now just pretend to delete the work unit since we're not using a real database yet
    res.status(200).send();
  }
});
/* create a workDay. */
router.post('/workDay', async function(req, res, next) {
  if (!req.body.id) {
    res.status(400).send('workDay object is required in request body')
  } else {
    // for now just pretend to add the work unit since we're not using a real database yet
    res.status(201).send();
  }
});

module.exports = router;
