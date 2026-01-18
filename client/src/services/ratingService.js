import axios from 'axios';
import authService from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ratingService = {
  // Submit a rating
  submitRating: async (rating, comment) => {
    const response = await axios.post(`${API_URL}/ratings/submit`, {
      rating,
      comment
    });
    return response.data;
  },

  // Get all ratings
  getAllRatings: async () => {
    const response = await axios.get(`${API_URL}/ratings/all`);
    return response.data;
  },

  // Get rating statistics
  getRatingStats: async () => {
    const response = await axios.get(`${API_URL}/ratings/stats`);
    return response.data;
  },

  // Check if user has rated
  checkUserRating: async () => {
    const response = await axios.get(`${API_URL}/ratings/check`);
    return response.data;
  }
};

export default ratingService;
