'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, DollarSign, BookOpen, TrendingUp, MessageSquare, Heart } from 'lucide-react';
import { College, Course, Placement, Review } from '@/types';
import { formatCurrency, calculatePlacementRate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CollegeDetailPage() {
  const params = useParams();
  const collegeId = params.id as string;

  const [college, setCollege] = useState<any>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchCollegeDetails();
  }, [collegeId]);

  const fetchCollegeDetails = async () => {
    try {
      setLoading(true);
      const [detailRes, coursesRes, placementsRes, reviewsRes] = await Promise.all([
        fetch(`/api/colleges/${collegeId}`),
        fetch(`/api/colleges/${collegeId}/courses`),
        fetch(`/api/colleges/${collegeId}/placements`),
        fetch(`/api/colleges/${collegeId}/reviews`),
      ]);

      const detailData = await detailRes.json();
      const coursesData = await coursesRes.json();
      const placementsData = await placementsRes.json();
      const reviewsData = await reviewsRes.json();

      if (detailData.success) setCollege(detailData.data);
      if (coursesData.success) setCourses(coursesData.data);
      if (placementsData.success) setPlacements(placementsData.data);
      if (reviewsData.success) setReviews(reviewsData.data.reviews);
    } catch (error) {
      toast.error('Failed to load college details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCollege = async () => {
    try {
      const response = await fetch('/api/saved-colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSaved(true);
        toast.success('College saved!');
      } else {
        toast.error(data.error || 'Failed to save college');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/colleges/${collegeId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Review added successfully!');
        setReviewData({ rating: 5, comment: '' });
        setShowReviewForm(false);
        fetchCollegeDetails();
      } else {
        toast.error(data.error || 'Failed to add review');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="container-max py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-40 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="container-max py-8 text-center">
        <p className="text-lg text-gray-600">College not found</p>
      </div>
    );
  }

  return (
    <div className="container-max py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">{college.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <span>
                  {college.city}, {college.state}
                </span>
              </div>
              {college.ranking && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold">#Rank: {college.ranking}</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleSaveCollege}
            disabled={isSaved}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 transition"
          >
            <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Rating and Fees */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-accent fill-accent" size={20} />
              <span className="text-sm text-gray-600">Rating</span>
            </div>
            <p className="text-2xl font-bold text-dark">
              {college.averageRating.toFixed(1)}/5
            </p>
            <p className="text-xs text-gray-500 mt-1">({college.reviewCount} reviews)</p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-secondary" size={20} />
              <span className="text-sm text-gray-600">Annual Fees</span>
            </div>
            <p className="text-2xl font-bold text-dark">{formatCurrency(college.fees)}</p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-primary" size={20} />
              <span className="text-sm text-gray-600">Established</span>
            </div>
            <p className="text-2xl font-bold text-dark">{college.established || 'N/A'}</p>
          </div>
        </div>

        {college.description && (
          <p className="text-gray-600 leading-relaxed">{college.description}</p>
        )}
      </div>

      {/* Contact Info */}
      {(college.website || college.phone || college.email) && (
        <div className="bg-light rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {college.website && (
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Visit Website
                </a>
              </div>
            )}
            {college.phone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <a href={`tel:${college.phone}`} className="text-primary hover:underline">
                  {college.phone}
                </a>
              </div>
            )}
            {college.email && (
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a href={`mailto:${college.email}`} className="text-primary hover:underline">
                  {college.email}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Courses */}
      {courses.length > 0 && (
        <div className="mb-8">
          <h2 className="section-title">Courses Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="card">
                <div className="flex items-start gap-3">
                  <BookOpen className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <h4 className="font-bold text-dark">{course.name}</h4>
                    <p className="text-sm text-gray-600">Duration: {course.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placements */}
      {placements.length > 0 && (
        <div className="mb-8">
          <h2 className="section-title">Placement Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left font-bold text-dark">Year</th>
                  <th className="px-4 py-3 text-left font-bold text-dark">Placement Rate</th>
                  <th className="px-4 py-3 text-left font-bold text-dark">Avg Salary</th>
                  <th className="px-4 py-3 text-left font-bold text-dark">Highest Salary</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((placement) => (
                  <tr key={placement.id} className="border-b border-gray-200 hover:bg-light transition">
                    <td className="px-4 py-3 font-semibold">{placement.year}</td>
                    <td className="px-4 py-3">
                      <span className="badge badge-success">
                        {calculatePlacementRate(placement.placedStudents, placement.totalStudents)}%
                      </span>
                    </td>
                    <td className="px-4 py-3">{formatCurrency(placement.averageSalary)}</td>
                    <td className="px-4 py-3 text-secondary font-semibold">
                      {formatCurrency(placement.highestSalary)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Reviews & Ratings</h2>
          <Link href="/auth/login" className="btn-primary">
            <MessageSquare size={18} className="inline mr-2" />
            Add Review
          </Link>
        </div>

        {showReviewForm && (
          <form onSubmit={handleAddReview} className="card mb-6">
            <h3 className="font-bold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark mb-2">Rating</label>
              <select
                value={reviewData.rating}
                onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                className="input-field"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Average</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark mb-2">Comment</label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                placeholder="Share your experience..."
                className="input-field h-24"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="card border-l-4 border-accent">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-dark">{review.user.name}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Comparison Button */}
      <div className="sticky bottom-8 right-8 flex justify-center">
        <Link
          href={`/compare?colleges=${collegeId}`}
          className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition"
        >
          Compare with Other Colleges
        </Link>
      </div>
    </div>
  );
}
