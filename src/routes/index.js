// routes/index.js
const express = require('express');
const router = express.Router();
const Index = require('../controllers/index');

router
  .route('/')
  .get(Index.getIndex)

router
  .route('/satPositions/:userLat/:userLong')
  .get(Index.getSatPosition)

module.exports = router;
