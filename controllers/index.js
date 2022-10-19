const express = require('express');
const router = express.Router();
const clientRoute = require('./clients');
const influencerRoute = require('./influencers');
const favouriteRoute = require('./favourites');
const contentRoute = require('./contents');
const reviewRoute = require('./reviews');

const verifyToken = require('../middleware/verifyToken');

router.use('/clients', clientRoute);
router.use('/influencers', influencerRoute);
router.use('/favourites', verifyToken, favouriteRoute);
router.use('/contents', verifyToken, contentRoute);
router.use('/reviews', verifyToken, reviewRoute);

module.exports = router;
