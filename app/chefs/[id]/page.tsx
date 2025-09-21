'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Chef, Experience, Review, Booking } from '@/lib/types';
import { ChefCard } from '@/components/ChefCard';
import { ExperienceCard } from '@/components/ExperienceCard';
import { ReviewsList } from '@/components/ReviewsList';
import { BookingFlow } from '@/components/BookingFlow';
import { Button } from '@/components/ui/Button';
import { Star, MapPin, Clock, Users, Award } from 'lucide-react';

export default function ChefProfilePage() {
  const params = useParams();
  const chefId = params.id as string;

  const [chef, setChef] = useState<Chef | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  useEffect(() => {
    const fetchChefData = async () => {
      try {
        setLoading(true);

        // Fetch chef data
        const chefResponse = await fetch(`/api/chefs/${chefId}`);
        if (!chefResponse.ok) {
          throw new Error('Failed to fetch chef data');
        }
        const chefData = await chefResponse.json();
        setChef(chefData.data);

        // Fetch chef's experiences
        const experiencesResponse = await fetch(`/api/experiences?chefId=${chefId}`);
        if (experiencesResponse.ok) {
          const experiencesData = await experiencesResponse.json();
          setExperiences(experiencesData.data);
        }

        // Fetch reviews for chef's experiences
        const reviewsPromises = experiences.map(exp =>
          fetch(`/api/reviews?experienceId=${exp.experienceId}`)
        );
        const reviewsResponses = await Promise.all(reviewsPromises);
        const reviewsData = await Promise.all(
          reviewsResponses.map(res => res.ok ? res.json() : { data: [] })
        );
        const allReviews = reviewsData.flatMap(reviewData => reviewData.data);
        setReviews(allReviews);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (chefId) {
      fetchChefData();
    }
  }, [chefId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-primary">Loading chef profile...</div>
      </div>
    );
  }

  if (error || !chef) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Chef Not Found</h1>
          <p className="text-text-secondary mb-6">{error || 'The chef you\'re looking for doesn\'t exist.'}</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const handleBookExperience = (experience: Experience) => {
    setSelectedExperience(experience);
    setShowBookingFlow(true);
  };

  const handleBookingComplete = (booking: Booking) => {
    // Refresh experiences to update booking counts
    fetchChefData();
    setShowBookingFlow(false);
    setSelectedExperience(null);
  };

  const handleCloseBooking = () => {
    setShowBookingFlow(false);
    setSelectedExperience(null);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/20 to-accent/20 py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Chef Avatar */}
            <div className="relative">
              <Image
                src={chef.profile_picture_url}
                alt={chef.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-surface"
              />
              {chef.verification_status === 'verified' && (
                <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Chef Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-text-primary mb-2">{chef.name}</h1>
              <p className="text-lg text-primary font-medium mb-2">{chef.cuisine_specialty}</p>

              {/* Rating */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-text-secondary">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>

              <p className="text-text-secondary leading-relaxed">{chef.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Experiences Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Culinary Experiences</h2>
          {experiences.length > 0 ? (
            <div className="grid gap-6">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience.experienceId}
                  experience={experience}
                  variant="booking"
                  onClick={() => handleBookExperience(experience)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No experiences available yet.</p>
            </div>
          )}
        </section>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Reviews</h2>
            <ReviewsList reviews={reviews} />
          </section>
        )}

        {/* Booking Flow Modal */}
        {showBookingFlow && selectedExperience && (
          <BookingFlow
            experience={selectedExperience}
            onClose={handleCloseBooking}
            onBookingComplete={handleBookingComplete}
          />
        )}
      </div>
    </div>
  );
}
