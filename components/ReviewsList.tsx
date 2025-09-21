'use client';

import { Review } from '@/lib/types';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ReviewsListProps {
  reviews: Review[];
  showExperience?: boolean;
}

export function ReviewsList({ reviews, showExperience = false }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.reviewId} className="card">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {review.user_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-text-primary">{review.user_name}</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {formatDate(review.review_time)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

