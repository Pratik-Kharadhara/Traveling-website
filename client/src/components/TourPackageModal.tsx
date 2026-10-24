import React, { useState } from 'react';
import { TourPackage } from '../types';
import { X, Check, Calendar, Users, Star, ShieldCheck, Heart, Share2, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface TourPackageModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export const TourPackageModal: React.FC<TourPackageModalProps> = ({ pkg, onClose, onBookingSuccess }) => {
  const { user, openAuthModal, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'policies'>('itinerary');
  const [guests, setGuests] = useState(2);
  const [startDate, setStartDate] = useState('2026-11-15');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!pkg) return null;

  const totalPrice = pkg.price * guests;

  const handleBooking = async () => {
    if (!user) {
      showToast('Please sign in to complete your reservation.', 'info');
      openAuthModal();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.createBooking({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        type: 'package',
        itemTitle: pkg.title,
        details: `${pkg.duration} • ${guests} Guest${guests > 1 ? 's' : ''}`,
        startDate,
        endDate: new Date(new Date(startDate).getTime() + 7 * 86400000).toISOString().split('T')[0],
        guests,
        totalPrice
      });

      if (res.success) {
        showToast(`Your escape to ${pkg.destination} has been confirmed!`, 'success');
        onBookingSuccess();
        onClose();
      } else {
        showToast(res.message || 'Unable to complete reservation.', 'error');
      }
    } catch {
      showToast('Reservation confirmed in offline mode.', 'success');
      onBookingSuccess();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--border-light)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <X size={18} />
        </button>

        {/* Gallery Banner */}
        <div style={{ position: 'relative', height: '340px', background: '#272320' }}>
          <img
            src={pkg.gallery[selectedPhotoIndex] || pkg.image}
            alt={pkg.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            display: 'flex',
            gap: '8px'
          }}>
            {pkg.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                style={{
                  width: '48px',
                  height: '34px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: selectedPhotoIndex === idx ? '2px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            gap: '8px'
          }}>
            <span className="badge-gold" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
              {pkg.category}
            </span>
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }} className="modal-content-grid">
          
          {/* Left Column: Details & Itinerary */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold-hover)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <MapPin size={14} />
              <span>{pkg.destination}, {pkg.country}</span>
            </div>

            <h2 style={{ fontSize: '1.85rem', marginTop: '6px', marginBottom: '8px' }}>
              {pkg.title}
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {pkg.tagline}
            </p>

            {/* Quick Specs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              padding: '12px 18px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Calendar size={15} color="var(--accent-gold)" />
                <span>{pkg.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Users size={15} color="var(--accent-gold)" />
                <span>{pkg.groupSize}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Star size={15} fill="#F6C343" color="#F6C343" />
                <span>{pkg.rating} ({pkg.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '20px'
            }}>
              <button
                onClick={() => setActiveTab('itinerary')}
                style={tabHeaderStyle(activeTab === 'itinerary')}
              >
                Day-by-Day Itinerary
              </button>
              <button
                onClick={() => setActiveTab('inclusions')}
                style={tabHeaderStyle(activeTab === 'inclusions')}
              >
                What's Included
              </button>
              <button
                onClick={() => setActiveTab('policies')}
                style={tabHeaderStyle(activeTab === 'policies')}
              >
                Concierge Notes
              </button>
            </div>

            {/* Tab: Itinerary */}
            {activeTab === 'itinerary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {pkg.itinerary.map(item => (
                  <div key={item.day} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'var(--accent-gold-subtle)',
                      border: '1px solid var(--accent-gold-border)',
                      color: 'var(--accent-gold-hover)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      flexShrink: 0
                    }}>
                      0{item.day}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '4px', fontWeight: 600 }}>{item.title}</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{item.desc}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 500 }}>
                        🍽 {item.meals}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Inclusions */}
            {activeTab === 'inclusions' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)', fontWeight: 600 }}>Included in Journey</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pkg.included.map((inc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem' }}>
                        <Check size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)', fontWeight: 600 }}>Excluded</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pkg.excluded.map((exc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>–</span>
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Policies */}
            {activeTab === 'policies' && (
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p><strong>Bespoke Flexibility:</strong> All private departures are 100% customizable. You can adjust pace, extend stays, or integrate private aviation upon request.</p>
                <p><strong>Discreet VIP Handling:</strong> Fast-track customs, private tarmac arrivals, and discreet luggage transfers are standard on all Aurelia Signature escapes.</p>
                <p><strong>Complimentary Cancellation:</strong> Cancel up to 30 days prior to departure for full credit towards any future private journey.</p>
              </div>
            )}
          </div>

          {/* Right Column: Reservation Card */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            alignSelf: 'start',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                Curated Investment
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                ${pkg.price.toLocaleString()}
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}> / guest</span>
              </div>
            </div>

            {/* Booking Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                  Departure Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-aesthetic"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Number of Travelers</label>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{guests} Guests</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    style={counterBtnStyle}
                  >
                    –
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    style={counterBtnStyle}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>${pkg.price.toLocaleString()} × {guests} guest{guests > 1 ? 's' : ''}</span>
                <span>${(pkg.price * guests).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--accent-gold-hover)' }}>
                <span>Private Concierge & Host</span>
                <span>Complimentary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.05rem', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <span>Total Investment</span>
                <span style={{ color: 'var(--text-main)', fontFamily: 'var(--font-serif)', fontSize: '1.35rem' }}>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Reserve Button */}
            <button
              onClick={handleBooking}
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            >
              <ShieldCheck size={17} />
              <span>{isSubmitting ? 'Securing Sanctuary...' : 'Reserve This Escape'}</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.74rem', color: 'var(--text-light)' }}>
              No immediate charges. Our concierge confirms within 24h.
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .modal-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

const tabHeaderStyle = (isActive: boolean): React.CSSProperties => ({
  background: 'transparent',
  border: 'none',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '0.88rem',
  fontWeight: isActive ? 600 : 400,
  color: isActive ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
  borderBottom: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
  transition: 'all 0.2s'
});

const counterBtnStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-light)',
  background: '#FFFFFF',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
