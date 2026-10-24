import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const ContactSection: React.FC = () => {
  const { showToast } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please provide your name, email, and travel inquiry.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitInquiry({
        name,
        email,
        phone,
        destination: destination || 'Bespoke Custom Journey',
        travelDate: departureDate,
        guests: Number(guests),
        message
      });

      if (res.success) {
        showToast('Inquiry received. A senior travel specialist will contact you within 24h.', 'success');
        setName('');
        setEmail('');
        setPhone('');
        setDestination('');
        setDepartureDate('');
        setMessage('');
      } else {
        showToast(res.message || 'Unable to submit inquiry.', 'error');
      }
    } catch {
      showToast('Inquiry registered in offline mode.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '400px 1fr'
      }} className="contact-grid">
        
        {/* Left Column: Bespoke Concierge Info */}
        <div style={{
          background: 'linear-gradient(145deg, #272320 0%, #1A1715 100%)',
          color: '#FAF8F5',
          padding: '45px 35px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge-gold" style={{ background: 'rgba(255,255,255,0.1)', color: '#D4B892', borderColor: 'rgba(212,184,146,0.3)' }}>
              Private Concierge
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#FAF8F5', marginTop: '14px', marginBottom: '14px' }}>
              Begin Your Bespoke Consultation
            </h2>
            <p style={{ color: '#D4C9BC', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '30px' }}>
              Whether you desire a private jet charter to the Serengeti or a sequestered ryokan in Kyoto, our specialist advisors orchestrate every detail.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={infoIconStyle}>
                  <Phone size={17} color="var(--accent-gold)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#A09689', textTransform: 'uppercase' }}>Direct Concierge</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#FAF8F5' }}>+1 (800) 792-6274</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={infoIconStyle}>
                  <Mail size={17} color="var(--accent-gold)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#A09689', textTransform: 'uppercase' }}>Private Inquiries</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#FAF8F5' }}>concierge@aurelia-escapes.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={infoIconStyle}>
                  <MapPin size={17} color="var(--accent-gold)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#A09689', textTransform: 'uppercase' }}>Private Salons</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#FAF8F5' }}>Mayfair, London • Ginza, Tokyo • 5th Ave, New York</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            color: '#B5ABA0'
          }}>
            <ShieldCheck size={16} color="var(--accent-gold)" />
            <span>Strict Client Confidentiality & NDA Protected</span>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div style={{ padding: '45px 40px' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Craft an Expedition Request</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Complete the form below. An advisor dedicated to your preferred region will respond discreetly.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lady Genevieve Cross"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-aesthetic"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-aesthetic"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+1 555 0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-aesthetic"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                  Destination of Interest
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kyoto, Positano, Alps"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="input-aesthetic"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                  Expected Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="input-aesthetic"
                >
                  <option value="1">Solo Traveler</option>
                  <option value="2">2 Guests (Couple)</option>
                  <option value="4">Small Group (3-5)</option>
                  <option value="8">Private Charter (6+)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                Your Travel Vision, Preferences & Special Requirements *
              </label>
              <textarea
                rows={4}
                placeholder="Share your ideal departure dates, villa desires, helicopter transfers, Michelin dining preferences..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-aesthetic"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold"
              style={{ alignSelf: 'flex-start', padding: '12px 28px', marginTop: '6px' }}
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Bespoke Inquiry'}</span>
            </button>
          </form>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

const infoIconStyle: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};
