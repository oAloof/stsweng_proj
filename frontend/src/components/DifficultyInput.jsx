const StarRating = () => {
  return (
    <>
      <h1>difficulty</h1>

      <div className="rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-1"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-2 mr-1"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-1"
          // checked
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-2 mr-1"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-1"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-2 mr-1"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-1"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-2 mr-1"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-1 star-2"
        />
        <input
          type="radio"
          name="rating-10"
          className="bg-secondary mask-star-2 mask-half-2 mr-1"
        />
      </div>
    </>
  );
};

export default StarRating;
