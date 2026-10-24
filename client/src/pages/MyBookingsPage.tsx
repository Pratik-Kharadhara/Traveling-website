import React from 'react';
import { Booking } from '../types';
import { Bookmark, Calendar, Trash2, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

interface MyBookingsPageProps {
  bookings: Booking[];
  onRefresh: () => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({ bookings, onRefresh }) => {
  const { user, showToast, openAuthModal } = useAuth();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <Bookmark size={48} color="var(--accent-gold)" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Sign in to View Your Reservations</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Access your confirmed escapes, luxury hotel stays, and premier airline tickets.
        </p>
        <button onClick={openAuthModal} className="btn-gold">
          Sign In to Access Trips
        </button>
      </div>
    );
  }

  const userBookings = bookings.filter(b => b.userId === user?.id || b.userEmail === user?.email);

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      await api.deleteBooking(id);
      showToast('Reservation cancelled and refunded to travel wallet.', 'info');
      onRefresh();
    } catch {
      showToast('Reservation cancelled.', 'info');
      onRefresh();
    }
  };

  return (
    <div style={{ padding: '60px 24px 90px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge-gold">
            <Bookmark size={13} />
            <span>Traveler Portfolio</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 2.8rem)', marginTop: '10px' }}>
            My Travel Reservations
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Welcome back, {user.name}. Here are your reserved sanctuaries, suites, and airline charters.
          </p>
        </div>

        <Link to="/destinations" className="btn-outline">
          <span>Explore More Escapes</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {userBookings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Compass size={44} color="var(--accent-gold)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No Active Reservations Found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 24px' }}>
            You haven’t reserved any journeys yet. Explore our curated portfolio of private departures and luxury suites.
          </p>
          <Link to="/destinations" className="btn-gold" style={{ textDecoration: 'none' }}>
            Browse Curated Escapes
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {userBookings.map(b => (
            <div
              key={b._id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                      {b.type.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      Booking Ref: #{b._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 600 }}>{b.itemTitle}</h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {b.details}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    ${b.totalPrice.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: b.status === 'confirmed' ? '#2E7D32' : b.status === 'pending' ? '#E65100' : '#C62828',
                    marginTop: '4px'
                  }}>
                    ● {b.status.toUpperCase()}
                  </div>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                fontSize: '0.84rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} color="var(--accent-gold)" />
                  <span>Scheduled Dates: <strong>{b.startDate}</strong> → <strong>{b.endDate}</strong> ({b.guests} Guests)</span>
                </div>

                <button
                  onClick={() => handleCancel(b._id)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #FFCDD2',
                    borderRadius: 'var(--radius-full)',
                    padding: '6px 14px',
                    color: '#C62828',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem'
                  }}
                >
                  <Trash2 size={14} />
                  <span>Cancel Reservation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
