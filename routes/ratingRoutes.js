const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are protected - require authentication
router.post('/submit', authMiddleware, ratingController.submitRating);
router.get('/all', ratingController.getAllRatings);
router.get('/stats', ratingController.getRatingStats);
router.get('/check', authMiddleware, ratingController.checkUserRating);

module.exports = router;
