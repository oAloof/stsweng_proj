import React, { useState } from 'react'

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0.5)

  const handleRatingChange = (event) => {
    const newRating = parseFloat(event.target.value)
    setRating(newRating)
    onChange(event.target.value)
  }

  return (
    <>
      <div>
        <h1>difficulty</h1>

        <div className="rating rating-lg rating-half">
          {/* <input type="radio" name="rating-10" className="rating-hidden" /> */}
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-1"
            value={0.5}
            checked={rating === 0.5}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-2 mr-1"
            value={1}
            checked={rating === 1}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-1"
            value={1.5}
            checked={rating === 1.5}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-2 mr-1"
            value={2}
            checked={rating === 2}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-1"
            value={2.5}
            checked={rating === 2.5}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-2 mr-1"
            value={3}
            checked={rating === 3}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-1"
            value={3.5}
            checked={rating === 3.5}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-2 mr-1"
            value={4}
            checked={rating === 4}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-1 star-2"
            value={4.5}
            checked={rating === 4.5}
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            name="rating-10"
            className="bg-secondary mask-star-2 mask-half-2 mr-1"
            value={5}
            checked={rating === 5}
            onChange={handleRatingChange}
          />
        </div>
      </div>
    </>
  )
}

export default StarRating
