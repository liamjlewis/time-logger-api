var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  if (!req.body.userId) {
    res.status(400).send('userId is required');
    return;
  }
  if(!req.db) {
    res.status(500).send('could not connect to database');
    return;
  }
  const userDataCollection = req.db.collection('user-data');
  const userData = await userDataCollection.findOne({ userId: req.body.userId });
  if (!!userData) {
    res.json( userData )
  } else {
    res.status(400).send({message: 'user with the given id not found'})
  }
});

/* DELETE a user's workUnit. */
router.delete('/workUnit', async function(req, res, next) {
  if (!req.body.userId) {
    res.status(400).send('userId is required');
    return;
  }
  if (!req.body.workUnitId) {
    res.status(400).send('workUnitId is required');
    return;
  }
  const userDataCollection = req.db.collection('user-data');
  const deleteResponse = await userDataCollection.updateOne({
    userId: req.body.userId
  }, {
    $pull: {
      workUnits: {
        id: req.body.workUnitId
      }
    }
  });
  if(deleteResponse.matchedCount < 1 || deleteResponse.modifiedCount < 1) {
    res.status(404).send('matching workUnit not found');
    return;
  }
  res.status(204).send();
});

/* create a workUnit. */
router.post('/workUnit', async function(req, res, next) {
  if (!req.body.userId) {
    res.status(400).send('userId is required');
    return;
  }
  if (!req.body.workUnit) {
    // NOTE: add type checking of the workUnit here
    res.status(400).send('workUnit is required');
    return;
  }
  if(!req.db) {
    res.status(500).send('could not connect to database');
    return;
  }
  const userDataCollection = req.db.collection('user-data');
  const addUserDataResponse = await userDataCollection.updateOne({
    userId: req.body.userId
  }, {
    $push: {
      workUnits: req.body.workUnit
    }
  });
  if(addUserDataResponse.matchedCount < 1 || addUserDataResponse.modifiedCount < 1) {
    res.status(500).send('unable to add workUnit');
    return;
  }
  res.status(200).send();
});

/* DELETE a user's workDay. */
router.delete('/workDay', async function(req, res, next) {
    if (!req.body.userId) {
      res.status(400).send('userId is required');
      return;
    }
    if (!req.body.workDayId) {
      res.status(400).send('workDayId is required');
      return;
    }
    const userDataCollection = req.db.collection('user-data');
    const deleteResponse = await userDataCollection.updateOne({
      userId: req.body.userId
    }, {
      $pull: {
        workDays: {
          id: req.body.workDayId
        }
      }
    });
    if(deleteResponse.matchedCount < 1 || deleteResponse.modifiedCount < 1) {
      res.status(404).send('matching workDay not found');
      return;
    }
    // delete all workUnits logged against this day
    const deleteRelatedWorkUnitsResponse = await userDataCollection.updateMany({
      userId: req.body.userId
    }, {
      $pull: {
        workUnits: {
          workDayId: req.body.workDayId
        }
      }
    });
    // no need to throw an error if nothing was deleted since there might not be workUnits logged against this workDay
    res.status(204).send();
});

/* create a workDay. */
router.post('/workDay', async function(req, res, next) {
  if (!req.body.userId) {
    res.status(400).send('userId is required');
    return;
  }
  if (!req.body.workDay) {
    // NOTE: add type checking of the workDay here
    res.status(400).send('workDay is required');
    return;
  }
  if(!req.db) {
    res.status(500).send('could not connect to database');
    return;
  }
  const userDataCollection = req.db.collection('user-data');
  const addUserDataResponse = await userDataCollection.updateOne({
    userId: req.body.userId
  }, {
    $push: {
      workDays: req.body.workDay
    }
  });
  if(addUserDataResponse.matchedCount < 1 || addUserDataResponse.modifiedCount < 1) {
    res.status(500).send('unable to add workDay');
    return;
  }
  res.status(200).send();
});

module.exports = router;
