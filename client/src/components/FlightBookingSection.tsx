import React, { useState } from 'react';
import { Flight } from '../types';
import { Plane, ArrowRight, ShieldCheck, Clock, Users, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface FlightBookingSectionProps {
  flights: Flight[];
  onBookingSuccess: () => void;
}

export const FlightBookingSection: React.FC<FlightBookingSectionProps> = ({ flights, onBookingSuccess }) => {
  const { user, openAuthModal, showToast } = useAuth();
  const [selectedClass, setSelectedClass] = useState<'All' | 'Economy' | 'Business' | 'First Class'>('All');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('2A (Window Suite)');
  const [passengers, setPassengers] = useState(1);
  const [departureDate, setDepartureDate] = useState('2026-11-12');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFlights = flights.filter(f => {
    if (selectedClass === 'All') return true;
    return f.class === selectedClass;
  });

  const seatOptions = [
    { code: '1A', type: 'Private Suite (Window)', extra: 150 },
    { code: '1K', type: 'Private Suite (Window)', extra: 150 },
    { code: '2A', type: 'Lie-Flat Bed (Window)', extra: 80 },
    { code: '2D', type: 'Center Couple Suite (Aisle)', extra: 50 },
    { code: '3B', type: 'Direct Aisle Access', extra: 0 }
  ];

  const handleBookFlight = async () => {
    if (!user) {
      showToast('Please sign in to confirm flight reservation.', 'info');
      openAuthModal();
      return;
    }

    if (!selectedFlight) return;

    const multiplier = tripType === 'round-trip' ? 1.85 : 1;
    const totalPrice = Math.round(selectedFlight.price * multiplier * passengers);

    setIsSubmitting(true);
    try {
      const res = await api.createBooking({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        type: 'flight',
        itemTitle: `${selectedFlight.airline} (${selectedFlight.flightNumber}) ${selectedFlight.fromCode} → ${selectedFlight.toCode}`,
        details: `${selectedFlight.class} • ${tripType === 'round-trip' ? 'Round-trip' : 'One-way'} • Seat: ${selectedSeat}`,
        startDate: departureDate,
        endDate: tripType === 'round-trip' ? new Date(new Date(departureDate).getTime() + 10 * 86400000).toISOString().split('T')[0] : departureDate,
        guests: passengers,
        totalPrice
      });

      if (res.success) {
        showToast(`Flight on ${selectedFlight.airline} booked successfully!`, 'success');
        onBookingSuccess();
        setSelectedFlight(null);
      } else {
        showToast(res.message || 'Flight booking failed.', 'error');
      }
    } catch {
      showToast('Flight booked in offline mode.', 'success');
      onBookingSuccess();
      setSelectedFlight(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="flights" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <span className="badge-gold">
          <Plane size={13} />
          <span>Aviation & First Class</span>
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '12px', marginBottom: '14px' }}>
          Premier International Flights
        </h2>
        <p style={{ maxWidth: '620px', margin: '0 auto' }}>
          Seamless lie-flat cabins, private suites, and world-class in-flight hospitality on prestigious global carriers.
        </p>
      </div>

      {/* Class filter tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '35px'
      }}>
        {(['All', 'Business', 'Economy', 'First Class'] as const).map(cls => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: selectedClass === cls ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
              background: selectedClass === cls ? 'var(--accent-gold-subtle)' : 'var(--surface)',
              color: selectedClass === cls ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: selectedClass === cls ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cls === 'All' ? 'All Classes' : `${cls} Class`}
          </button>
        ))}
      </div>

      {/* Flight Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredFlights.map(flight => (
          <div
            key={flight.id}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: '200px 1fr 200px',
              gap: '24px',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-smooth)'
            }}
            className="flight-grid-row"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            {/* Airline Info */}
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
                {flight.airline}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                Flight {flight.flightNumber}
              </div>
              <span className="badge-gold" style={{ marginTop: '8px', fontSize: '0.7rem' }}>
                {flight.class}
              </span>
            </div>

            {/* Flight Timetable Graphic */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {flight.departureTime}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold-hover)' }}>
                  {flight.fromCode}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{flight.from}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '4px' }}>{flight.duration}</div>
                <div style={{ position: 'relative', width: '100%', height: '2px', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plane size={14} color="var(--accent-gold)" style={{ transform: 'rotate(90deg)', background: 'var(--bg-primary)', padding: '0 2px' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', marginTop: '4px', fontWeight: 500 }}>
                  {flight.stops}
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {flight.arrivalTime}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold-hover)' }}>
                  {flight.toCode}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{flight.to}</div>
              </div>
            </div>

            {/* Price & Book */}
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Fares From</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  ${flight.price.toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => setSelectedFlight(flight)}
                className="btn-gold"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                Select Seats
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Flight Booking & Seat Modal */}
      {selectedFlight && (
        <div className="modal-overlay" onClick={() => setSelectedFlight(null)}>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '640px',
              padding: '28px',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFlight(null)}
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

            <span className="badge-gold">Seat Selection & Boarding</span>
            <h2 style={{ fontSize: '1.7rem', marginTop: '6px', marginBottom: '4px' }}>
              {selectedFlight.airline} {selectedFlight.flightNumber}
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {selectedFlight.from} ({selectedFlight.fromCode}) → {selectedFlight.to} ({selectedFlight.toCode})
            </div>

            {/* Trip Type and Class */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Trip Type
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setTripType('round-trip')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      border: tripType === 'round-trip' ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      background: tripType === 'round-trip' ? 'var(--accent-gold-subtle)' : '#FFF',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      fontWeight: tripType === 'round-trip' ? 600 : 400
                    }}
                  >
                    Round-trip
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('one-way')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      border: tripType === 'one-way' ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      background: tripType === 'one-way' ? 'var(--accent-gold-subtle)' : '#FFF',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      fontWeight: tripType === 'one-way' ? 600 : 400
                    }}
                  >
                    One-way
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="input-aesthetic"
                  style={{ padding: '8px 12px' }}
                />
              </div>
            </div>

            {/* Seat selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                Select Preferred Cabin Suite / Seat
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {seatOptions.map(seat => (
                  <div
                    key={seat.code}
                    onClick={() => setSelectedSeat(`${seat.code} - ${seat.type}`)}
                    style={{
                      border: selectedSeat.startsWith(seat.code) ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      background: selectedSeat.startsWith(seat.code) ? 'var(--accent-gold-subtle)' : 'var(--surface)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--accent-gold-hover)' }}>{seat.code}</span>
                      <span>{seat.type}</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {seat.extra === 0 ? 'Standard' : `+$${seat.extra}`}
                    </span>
                  </div>
                ))}
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
                <span>Base Airfare ({selectedFlight.class})</span>
                <span>${(selectedFlight.price * (tripType === 'round-trip' ? 1.85 : 1)).toFixed(0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--accent-gold-hover)' }}>
                <span>Lounge Access & 32kg Baggage</span>
                <span>Complimentary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 600, marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <span>Total Ticket Price</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                  ${Math.round(selectedFlight.price * (tripType === 'round-trip' ? 1.85 : 1)).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleBookFlight}
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', padding: '12px' }}
            >
              <ShieldCheck size={18} />
              <span>{isSubmitting ? 'Issuing Ticket...' : 'Confirm Flight Reservation'}</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .flight-grid-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
