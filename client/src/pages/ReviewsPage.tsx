import React from 'react';
import { ReviewItem } from '../types';
import { ReviewsSection } from '../components/ReviewsSection';

interface ReviewsPageProps {
  reviews: ReviewItem[];
  onReviewAdded: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ reviews, onReviewAdded }) => {
  return (
    <div style={{ padding: '20px 0 60px' }}>
      <ReviewsSection reviews={reviews} onReviewAdded={onReviewAdded} />
    </div>
  );
};
