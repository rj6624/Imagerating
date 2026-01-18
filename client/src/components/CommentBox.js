import React, { useState, useEffect } from 'react';
import RatingStars from './RatingStars';
import ratingService from '../services/ratingService';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const CommentBox = ({ onSubmitSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      checkUserRating();
    }
  }, [isAuthenticated]);

  const checkUserRating = async () => {
    try {
      const response = await ratingService.checkUserRating();
      setHasRated(response.hasRated);
      if (response.hasRated) {
        toast.info('You have already submitted a rating');
      }
    } catch (error) {
      console.error('Error checking user rating:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to submit a rating');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setLoading(true);

    try {
      await ratingService.submitRating(rating, comment);
      toast.success('Rating submitted successfully!');
      setRating(0);
      setComment('');
      setHasRated(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to submit rating';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (hasRated) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600">You have already submitted your rating for this image.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h3>
          <p className="text-gray-600">Please login to rate and comment on this image.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Rate & Comment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Rating
          </label>
          <RatingStars rating={rating} setRating={setRating} />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition"
            placeholder="Share your thoughts about this image..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {comment.length}/500 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || rating === 0}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Rating'}
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
