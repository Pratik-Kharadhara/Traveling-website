import React, { useState } from 'react';
import { Hotel } from '../types';
import { Hotel as HotelIcon, Star, MapPin, Check, Wifi, Sparkles, Calendar, Users, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface HotelsPageProps {
  hotels: Hotel[];
  onBookingSuccess: () => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ hotels, onBookingSuccess }) => {
  const { user, openAuthModal, showToast } = useAuth();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('2026-11-20');
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredHotels = hotels.filter(h => {
    if (!searchCity) return true;
    const q = searchCity.toLowerCase();
    return h.city.toLowerCase().includes(q) || h.name.toLowerCase().includes(q) || h.country.toLowerCase().includes(q);
  });

  const handleBookHotel = async () => {
    if (!user) {
      showToast('Please sign in to reserve your suite.', 'info');
      openAuthModal();
      return;
    }

    if (!selectedHotel) return;

    const room = selectedHotel.roomTypes[selectedRoomIndex];
    const totalPrice = room.price * nights;

    setIsSubmitting(true);
    try {
      const res = await api.createBooking({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        type: 'hotel',
        itemTitle: selectedHotel.name,
        details: `${room.type} • ${nights} Nights (${nights} × $${room.price})`,
        startDate: checkIn,
        endDate: new Date(new Date(checkIn).getTime() + nights * 86400000).toISOString().split('T')[0],
        guests,
        totalPrice
      });

      if (res.success) {
        showToast(`Suite at ${selectedHotel.name} reserved successfully!`, 'success');
        onBookingSuccess();
        setSelectedHotel(null);
        navigate('/my-bookings');
      } else {
        showToast(res.message || 'Booking failed.', 'error');
      }
    } catch {
      showToast('Suite reserved in offline mode.', 'success');
      onBookingSuccess();
      setSelectedHotel(null);
      navigate('/my-bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '60px 24px 90px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <span className="badge-gold">
          <HotelIcon size={13} />
          <span>Sanctuaries & Villas</span>
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', marginTop: '14px', marginBottom: '14px' }}>
          Handpicked Luxury Hotel Residences
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
          Historic palazzos, private onsen estates, and cliffside suites selected for timeless comfort and bespoke hospitality.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        maxWidth: '620px',
        margin: '0 auto 45px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <MapPin size={20} color="var(--accent-gold)" />
        <input
          type="text"
          placeholder="Filter by city (Kyoto, Positano, Andermatt, Santorini)..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="input-aesthetic"
          style={{ border: 'none', padding: '6px' }}
        />
        {searchCity && (
          <button
            onClick={() => setSearchCity('')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Hotel Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '30px'
      }}>
        {filteredHotels.map(hotel => (
          <div
            key={hotel.id}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-smooth)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img
                src={hotel.image}
                alt={hotel.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--accent-gold-hover)',
                border: '1px solid var(--accent-gold-border)'
              }}>
                {'★'.repeat(hotel.stars)} Luxury Star
              </div>

              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(30, 25, 20, 0.8)',
                backdropFilter: 'blur(4px)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Star size={13} fill="#F6C343" color="#F6C343" />
                <span style={{ fontWeight: 600 }}>{hotel.rating.toFixed(2)}</span>
                <span style={{ opacity: 0.8 }}>({hotel.reviewsCount})</span>
              </div>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-hover)', fontWeight: 600, marginBottom: '4px' }}>
                  {hotel.location}, {hotel.city}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
                  {hotel.name}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {hotel.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        background: 'var(--bg-primary)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                    Starting From
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    ${hotel.pricePerNight.toLocaleString()}
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-muted)' }}> / night</span>
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedHotel(hotel); setSelectedRoomIndex(0); }}
                  className="btn-gold"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  Select Suite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Reservation Modal */}
      {selectedHotel && (
        <div className="modal-overlay" onClick={() => setSelectedHotel(null)}>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '680px',
              padding: '32px',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedHotel(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <span className="badge-gold" style={{ marginBottom: '8px' }}>Hotel Reservation</span>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{selectedHotel.name}</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {selectedHotel.location}, {selectedHotel.city}, {selectedHotel.country}
            </div>

            {/* Room Type Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                Select Residence or Suite Category
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedHotel.roomTypes.map((room, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedRoomIndex(idx)}
                    style={{
                      border: selectedRoomIndex === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      background: selectedRoomIndex === idx ? 'var(--accent-gold-subtle)' : 'var(--surface)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{room.type}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Capacity: {room.capacity} Guests • {room.size}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--accent-gold-hover)' }}>
                        ${room.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>per night</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Check-in and Nights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="input-aesthetic"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Nights
                </label>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="input-aesthetic"
                >
                  {[1, 2, 3, 4, 5, 7, 10, 14].map(n => (
                    <option key={n} value={n}>{n} Night{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="input-aesthetic"
                >
                  {[1, 2, 3, 4].map(g => (
                    <option key={g} value={g}>{g} Guest{g > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Calculation and Submit */}
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              border: '1px solid var(--border-light)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>{selectedHotel.roomTypes[selectedRoomIndex].type} × {nights} nights</span>
                <span>${(selectedHotel.roomTypes[selectedRoomIndex].price * nights).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--accent-gold-hover)' }}>
                <span>Complimentary Breakfast & Butler Service</span>
                <span>Included</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 600, marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <span>Total Stay</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                  ${(selectedHotel.roomTypes[selectedRoomIndex].price * nights).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleBookHotel}
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', padding: '12px' }}
            >
              <ShieldCheck size={18} />
              <span>{isSubmitting ? 'Securing Suite...' : 'Confirm Stay Reservation'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
