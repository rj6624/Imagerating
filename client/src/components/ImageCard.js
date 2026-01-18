import React from 'react';

const ImageCard = () => {
  // Sample image URL - can be changed to any image
  const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-96 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h2 className="text-white text-2xl font-bold">Rate This Beautiful Landscape</h2>
          <p className="text-gray-200 text-sm mt-1">Share your thoughts and rating</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
