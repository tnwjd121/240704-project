import React, { useState } from 'react'
import '../css/starRating.css'

export default function StarRating({score, onScoreChange}) {
  const [rating, setRating] = useState(score);
  
  const handleStarClick = (value) => {
    setRating(value)
    onScoreChange(value)
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={starValue <= rating ? "star filled" : "star"}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  )
}
