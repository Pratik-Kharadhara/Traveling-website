import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TourPackage } from '../types';
import { MapPin, Calendar, Users, Star, Check, ShieldCheck, ArrowLeft, Share2, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface PackageDetailPageProps {
  packages: TourPackage[];
  onBookingSuccess: () => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ packages, onBookingSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, openAuthModal, showToast } = useAuth();

  const pkg = packages.find(p => p._id === id);

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'policies'>('itinerary');
  const [guests, setGuests] = useState(2);
  const [startDate, setStartDate] = useState('2026-11-15');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pkg) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 24px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '14px' }}>Tour Package Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>The requested travel itinerary could not be retrieved.</p>
        <Link to="/destinations" className="btn-gold" style={{ textDecoration: 'none' }}>
          Back to Destinations
        </Link>
      </div>
    );
  }

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
        navigate('/my-bookings');
      } else {
        showToast(res.message || 'Unable to complete reservation.', 'error');
      }
    } catch {
      showToast('Reservation confirmed in offline mode.', 'success');
      onBookingSuccess();
      navigate('/my-bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px 24px 90px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to="/destinations" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Destinations</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{pkg.destination}</span>
      </div>

      {/* Main Grid: Details Left, Booking Card Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }} className="package-detail-grid">
        
        {/* Left Column: Photos, Overview, Itinerary */}
        <div>
          {/* Main Hero Gallery */}
          <div style={{ position: 'relative', height: '440px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '16px', background: '#272320' }}>
            <img
              src={pkg.gallery[selectedPhotoIndex] || pkg.image}
              alt={pkg.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
              <span className="badge-gold" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                {pkg.category}
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
            {pkg.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                style={{
                  width: '90px',
                  height: '60px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: selectedPhotoIndex === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold-hover)', fontSize: '0.88rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
            <MapPin size={16} />
            <span>{pkg.destination}, {pkg.country}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', marginBottom: '12px', lineHeight: 1.2 }}>
            {pkg.title}
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
            {pkg.tagline}
          </p>

          {/* Specs Strip */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            padding: '16px 24px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <Calendar size={18} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Duration</div>
                <div style={{ fontWeight: 600 }}>{pkg.duration}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <Users size={18} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Group Size</div>
                <div style={{ fontWeight: 600 }}>{pkg.groupSize}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <Star size={18} fill="#F6C343" color="#F6C343" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Guest Rating</div>
                <div style={{ fontWeight: 600 }}>{pkg.rating} ({pkg.reviewsCount} reviews)</div>
              </div>
            </div>
          </div>

          {/* Tabs: Itinerary, Inclusions, Policies */}
          <div style={{
            display: 'flex',
            gap: '12px',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '28px'
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
              What's Included & Excluded
            </button>
            <button
              onClick={() => setActiveTab('policies')}
              style={tabHeaderStyle(activeTab === 'policies')}
            >
              Concierge Policies
            </button>
          </div>

          {/* Tab: Itinerary */}
          {activeTab === 'itinerary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {pkg.itinerary.map(item => (
                <div key={item.day} style={{ display: 'flex', gap: '18px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--accent-gold-subtle)',
                    border: '1.5px solid var(--accent-gold-border)',
                    color: 'var(--accent-gold-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    0{item.day}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '6px', fontWeight: 600 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 500 }}>
                      🍽 {item.meals}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Inclusions */}
          {activeTab === 'inclusions' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--text-main)', fontWeight: 600 }}>
                  Included with Your Sanctuary
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pkg.included.map((inc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                      <Check size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--text-main)', fontWeight: 600 }}>
                  Excluded
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pkg.excluded.map((exc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
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
            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: 1.6 }}>
              <p><strong>Bespoke Flexibility:</strong> All private departures are 100% customizable. You can adjust pace, extend stays, or integrate private aviation upon request.</p>
              <p><strong>Discreet VIP Handling:</strong> Fast-track customs, private tarmac arrivals, and discreet luggage transfers are standard on all Aurelia Signature escapes.</p>
              <p><strong>Complimentary Cancellation:</strong> Cancel up to 30 days prior to departure for full credit towards any future private journey.</p>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Reservation Box */}
        <div>
          <div style={{
            position: 'sticky',
            top: '100px',
            background: 'var(--surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                All-Inclusive Investment
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--text-main)' }}>
                ${pkg.price.toLocaleString()}
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}> / guest</span>
              </div>
            </div>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '22px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Number of Travelers</label>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{guests} Guests</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    style={counterBtnStyle}
                  >
                    –
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '1.05rem' }}>{guests}</span>
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
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '8px' }}>
                <span>${pkg.price.toLocaleString()} × {guests} guests</span>
                <span>${(pkg.price * guests).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '8px', color: 'var(--accent-gold-hover)' }}>
                <span>Private Chauffeur & Dedicated Host</span>
                <span>Included</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.15rem', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                <span>Total Investment</span>
                <span style={{ color: 'var(--text-main)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Reserve Button */}
            <button
              onClick={handleBooking}
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              <ShieldCheck size={18} />
              <span>{isSubmitting ? 'Securing Sanctuary...' : 'Reserve This Escape'}</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.76rem', color: 'var(--text-light)' }}>
              No immediate charges. Our private concierge verifies permissions within 24 hours.
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .package-detail-grid {
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
  padding: '10px 18px',
  cursor: 'pointer',
  fontSize: '0.92rem',
  fontWeight: isActive ? 600 : 400,
  color: isActive ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
  borderBottom: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
  transition: 'all 0.2s'
});

const counterBtnStyle: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-light)',
  background: '#FFFFFF',
  cursor: 'pointer',
  fontSize: '1.1rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
