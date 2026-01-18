import React, { useState } from 'react';
import ImageCard from '../components/ImageCard';
import CommentBox from '../components/CommentBox';
import RatingChart from '../components/RatingChart';
import CommentList from '../components/CommentList';

const Home = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmitSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Rate This Amazing Image
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your thoughts and see what others think about this beautiful photograph
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image and Rating Form */}
          <div className="space-y-8">
            <ImageCard />
            <CommentBox onSubmitSuccess={handleSubmitSuccess} />
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-8">
            <RatingChart refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Comments Section - Full Width */}
        <div className="mt-12">
          <CommentList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default Home;
