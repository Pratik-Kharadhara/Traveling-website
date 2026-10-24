import React from 'react';
import { Booking } from '../types';
import { X, Calendar, MapPin, CheckCircle, Clock, Trash2, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onRefresh: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onRefresh
}) => {
  const { user, showToast } = useAuth();

  if (!isOpen) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={18} color="var(--accent-gold)" />
            <h2 style={{ fontSize: '1.5rem', lineHeight: 1 }}>My Travel Reservations</h2>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Reserved escapes, boutique hotels, and luxury airline charters.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {userBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                No active reservations found
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Explore our curated escapes, hotels, or flights to begin your journey.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userBookings.map(b => (
                <div
                  key={b._id}
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="badge-gold" style={{ fontSize: '0.68rem', marginBottom: '6px' }}>
                        {b.type.toUpperCase()}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{b.itemTitle}</h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {b.details}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        ${b.totalPrice.toLocaleString()}
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: b.status === 'confirmed' ? '#2E7D32' : '#C62828'
                      }}>
                        ● {b.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-light)'
                  }}>
                    <span>Departure: {b.startDate} → {b.endDate}</span>
                    <button
                      onClick={() => handleCancel(b._id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#C62828',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Cancel Reservation</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
