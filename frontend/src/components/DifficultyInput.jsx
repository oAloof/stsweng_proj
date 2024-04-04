import React, { useState } from 'react'

const StarRating = ({ value, onChange }) => {
  const [rating, setRating] = useState(0.5)

  const handleRatingChange = (event) => {
    const newRating = parseFloat(event.target.value)
    setRating(newRating)
    onChange(newRating)
  }

  return (
    <>
      <div>
        <h1>difficulty</h1>

        <div className='rating rating-lg rating-half'>
          {/* <input type="radio" name="rating-10" className="rating-hidden" /> */}
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-1'
            value={0.5}
            checked={value === 0.5}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-2 mr-1'
            value={1}
            checked={value === 1}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-1'
            value={1.5}
            checked={value === 1.5}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-2 mr-1'
            value={2}
            checked={value === 2}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-1'
            value={2.5}
            checked={value === 2.5}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-2 mr-1'
            value={3}
            checked={value === 3}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-1'
            value={3.5}
            checked={value === 3.5}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-2 mr-1'
            value={4}
            checked={value === 4}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-1 star-2'
            value={4.5}
            checked={value === 4.5}
            onChange={handleRatingChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-secondary mask-star-2 mask-half-2 mr-1'
            value={5}
            checked={value === 5}
            onChange={handleRatingChange}
          />
        </div>
      </div>
    </>
  )
}

export default StarRating
