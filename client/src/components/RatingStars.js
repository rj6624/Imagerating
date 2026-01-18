import React, { useState } from 'react';

const RatingStars = ({ rating, setRating, disabled = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          className={`text-4xl transition-all duration-200 transform hover:scale-110 ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => !disabled && setRating(star)}
          onMouseEnter={() => !disabled && setHover(star)}
          onMouseLeave={() => !disabled && setHover(0)}
        >
          <span
            className={`${
              star <= (hover || rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-gray-600 font-medium">
          {rating} {rating === 1 ? 'star' : 'stars'}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
