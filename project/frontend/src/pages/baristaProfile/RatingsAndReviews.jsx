import { Star } from 'lucide-react';

const RatingsAndReviews = ({ rating, reviews }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-3">Ratings and Reviews</h2>
      <div className="flex items-center space-x-2">
        <Star className="text-yellow-400" fill="currentColor" />
        <span className="font-bold">{rating}</span>
        <span>({reviews} reviews)</span>
      </div>
    </div>
  );
};

export default RatingsAndReviews;
