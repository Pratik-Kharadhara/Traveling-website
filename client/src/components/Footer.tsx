import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Globe, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { showToast } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Welcome to the Aurelia Gazette private editorial dispatch.', 'success');
      setEmail('');
    }
  };

  return (
    <footer style={{
      background: '#201D1A',
      color: '#FAF8F5',
      borderTop: '1px solid #332F2A',
      padding: '70px 24px 30px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1.5px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Compass size={18} color="var(--accent-gold)" />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.12em' }}>
                A U R E L I A
              </span>
            </div>
            <p style={{ color: '#B5ABA0', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Handcrafting bespoke sanctuaries, private island charters, and transformative cultural pilgrimages for global connoisseurs.
            </p>
            <div style={{ display: 'flex', gap: '14px' }}>
              <Link to="/gallery" style={socialIconStyle} title="Global Portfolios"><Globe size={16} /></Link>
              <Link to="/destinations" style={socialIconStyle} title="Private Expeditions"><Compass size={16} /></Link>
              <Link to="/contact" style={socialIconStyle} title="Contact Concierge"><Share2 size={16} /></Link>
            </div>
          </div>

          {/* Curated Portfolios */}
          <div>
            <h4 style={{ color: '#FAF8F5', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 600 }}>Pages & Escapes</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <Link to="/" style={footerLinkStyle}>Home Sanctuary</Link>
              <Link to="/destinations" style={footerLinkStyle}>All Tour Destinations</Link>
              <Link to="/hotels" style={footerLinkStyle}>Luxury Hotel Residences</Link>
              <Link to="/flights" style={footerLinkStyle}>Premier Airline Flights</Link>
              <Link to="/itinerary" style={footerLinkStyle}>Bespoke Itinerary Planner</Link>
            </div>
          </div>

          {/* Private Hospitality */}
          <div>
            <h4 style={{ color: '#FAF8F5', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 600 }}>Hospitality & Concierge</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <Link to="/gallery" style={footerLinkStyle}>Visual Photography Archive</Link>
              <Link to="/reviews" style={footerLinkStyle}>Verified Traveler Testimonials</Link>
              <Link to="/contact" style={footerLinkStyle}>Private Concierge Desk</Link>
              <Link to="/my-bookings" style={footerLinkStyle}>My Reservations</Link>
              <Link to="/admin" style={footerLinkStyle}>Administrative Portal</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#FAF8F5', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>The Aurelia Gazette</h4>
            <p style={{ color: '#B5ABA0', fontSize: '0.82rem', marginBottom: '14px', lineHeight: 1.5 }}>
              Receive our quarterly bound private travel monographs and invitation-only villa openings.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Your personal email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #443F3A',
                  background: '#2B2724',
                  color: '#FAF8F5',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
                required
              />
              <button
                type="submit"
                style={{
                  background: 'var(--accent-gold)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #332F2A',
          paddingTop: '25px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.78rem',
          color: '#8D8478'
        }}>
          <div>
            © 2026 AURELIA Bespoke Escapes Inc. Multipage MERN Architecture with TypeScript.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Curation</span>
            <span style={{ cursor: 'pointer' }}>Discreet Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

const footerLinkStyle: React.CSSProperties = {
  color: '#C4BAB0',
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer'
};

const socialIconStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: '#2B2724',
  border: '1px solid #443F3A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FAF8F5',
  textDecoration: 'none'
};
