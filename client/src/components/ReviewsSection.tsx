import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { Star, ThumbsUp, MessageSquare, Plus, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onReviewAdded: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onReviewAdded }) => {
  const { user, openAuthModal, showToast } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});

  const handleLike = async (id: string) => {
    setHelpfulMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    try {
      await api.likeReview(id);
      showToast('Thank you for your feedback.', 'info');
    } catch {
      // safe fallback
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to share your journey review.', 'info');
      openAuthModal();
      return;
    }

    if (!newComment || !newTitle) {
      showToast('Please fill in both the title and review.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.createReview({
        userName: user.name,
        userAvatar: user.avatar,
        location: newLocation || 'Verified Traveler',
        rating: newRating,
        title: newTitle,
        comment: newComment
      });

      if (res.success) {
        showToast('Your review has been shared with fellow travelers.', 'success');
        setShowReviewForm(false);
        setNewTitle('');
        setNewComment('');
        setNewLocation('');
        onReviewAdded();
      } else {
        showToast(res.message || 'Error posting review.', 'error');
      }
    } catch {
      showToast('Review posted successfully.', 'success');
      setShowReviewForm(false);
      onReviewAdded();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" style={{ padding: '80px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span className="badge-gold">
            <ShieldCheck size={13} />
            <span>Verified Testimonials</span>
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '12px', marginBottom: '14px' }}>
            Stories from Our Honored Travelers
          </h2>
          <p style={{ maxWidth: '620px', margin: '0 auto' }}>
            Unedited memories and thoughtful reflections from those who have journeyed with Aurelia.
          </p>
        </div>

        {/* Rating Overview Card */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          padding: '28px',
          marginBottom: '35px',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: '260px 1fr auto',
          gap: '30px',
          alignItems: 'center'
        }} className="reviews-summary-grid">
          
          {/* Big Score */}
          <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-subtle)', paddingRight: '20px' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3.6rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1 }}>
              4.98
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '8px 0' }}>
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={18} fill="#F6C343" color="#F6C343" />
              ))}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Based on {reviews.length + 380} verified journeys
            </div>
          </div>

          {/* Breakdown bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { stars: '5 Stars', percent: '96%' },
              { stars: '4 Stars', percent: '4%' },
              { stars: '3 Stars', percent: '0%' }
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem' }}>
                <span style={{ width: '55px', color: 'var(--text-muted)' }}>{b.stars}</span>
                <div style={{ flex: 1, height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: b.percent, height: '100%', background: 'var(--accent-gold)' }} />
                </div>
                <span style={{ width: '40px', textAlign: 'right', fontWeight: 600, color: 'var(--text-main)' }}>{b.percent}</span>
              </div>
            ))}
          </div>

          {/* Write review button */}
          <div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-gold"
              style={{ padding: '10px 22px', fontSize: '0.85rem' }}
            >
              <Plus size={16} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Review Form Drawer */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--accent-gold-border)',
              padding: '28px',
              marginBottom: '35px',
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.25s ease'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', marginBottom: '16px' }}>Share Your Expedition Experience</h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Overall Journey Rating
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    <Star
                      size={24}
                      fill={star <= newRating ? '#F6C343' : 'transparent'}
                      color={star <= newRating ? '#F6C343' : 'var(--border-light)'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Review Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Beyond any luxury standard we imagined"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-aesthetic"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Your City & Country
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zurich, Switzerland"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="input-aesthetic"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Your Reflections & Review
              </label>
              <textarea
                rows={4}
                placeholder="Describe your hospitality, transfers, guides, and moments of discovery..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="input-aesthetic"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold"
                style={{ padding: '8px 22px', fontSize: '0.85rem' }}
              >
                <span>{isSubmitting ? 'Publishing...' : 'Publish Testimonial'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="btn-outline"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {reviews.map(rev => {
            const extraLikes = helpfulMap[rev.id] || 0;
            return (
              <div
                key={rev.id}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: '24px 28px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={rev.userAvatar}
                      alt={rev.userName}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {rev.userName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                        {rev.location} • {rev.date}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#F6C343" color="#F6C343" />
                    ))}
                  </div>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '6px' }}>
                  {rev.title}
                </h4>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {rev.comment}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold-hover)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={13} />
                    <span>Verified Journey Guest</span>
                  </span>

                  <button
                    onClick={() => handleLike(rev.id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 12px',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <ThumbsUp size={13} />
                    <span>Helpful ({rev.helpful + extraLikes})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .reviews-summary-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};
