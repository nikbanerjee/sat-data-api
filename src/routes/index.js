// routes/index.js
const express = require('express');
const router = express.Router();
const Index = require('../controllers/index');

router
  .route('/')
  .get(Index.getIndex)

router
  .route('/satPositions/:userLat/:userLong/:userAlt')
  .get(Index.getSatPosition)

module.exports = router;
