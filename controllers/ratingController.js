const Rating = require('../models/Rating');
const User = require('../models/User');

// Submit a rating
exports.submitRating = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user._id;

    // Validation
    if (!rating || !comment) {
      return res.status(400).json({ error: 'Please provide rating and comment' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if user already rated
    const existingRating = await Rating.findOne({ userId });
    if (existingRating) {
      return res.status(400).json({ error: 'You have already submitted a rating' });
    }

    // Create rating
    const newRating = await Rating.create({
      userId,
      rating,
      comment
    });

    // Populate user data
    await newRating.populate('userId', 'name email profileImage');

    res.status(201).json({
      success: true,
      rating: newRating
    });
  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({ error: 'Server error while submitting rating' });
  }
};

// Get all ratings
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate('userId', 'name email profileImage')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({ error: 'Server error while fetching ratings' });
  }
};

// Get rating statistics
exports.getRatingStats = async (req, res) => {
  try {
    const stats = await Rating.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ]);

    // Format stats for all rating values (1-5)
    const formattedStats = [5, 4, 3, 2, 1].map(rating => {
      const stat = stats.find(s => s._id === rating);
      return {
        rating,
        count: stat ? stat.count : 0
      };
    });

    // Calculate average rating
    const totalRatings = await Rating.countDocuments();
    const sumRatings = await Rating.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$rating' }
        }
      }
    ]);

    const averageRating = totalRatings > 0 
      ? (sumRatings[0]?.total / totalRatings).toFixed(1)
      : 0;

    res.json({
      success: true,
      stats: formattedStats,
      totalRatings,
      averageRating
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error while fetching statistics' });
  }
};

// Check if user has rated
exports.checkUserRating = async (req, res) => {
  try {
    const userId = req.user._id;
    const rating = await Rating.findOne({ userId });

    res.json({
      success: true,
      hasRated: !!rating,
      rating: rating || null
    });
  } catch (error) {
    console.error('Check user rating error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
