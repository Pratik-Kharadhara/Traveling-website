import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Sparkles, Plane, Hotel, Compass } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string, category?: string) => void;
  onSelectTab: (tab: 'packages' | 'hotels' | 'flights') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onSelectTab }) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'hotels' | 'flights'>('packages');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory === 'All' ? undefined : selectedCategory);
    const destEl = document.getElementById(activeTab === 'hotels' ? 'hotels' : activeTab === 'flights' ? 'flights' : 'destinations');
    if (destEl) {
      destEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      position: 'relative',
      padding: '70px 24px 60px',
      background: 'radial-gradient(ellipse at top, #FAF5ED 0%, #FAF8F5 70%)',
      borderBottom: '1px solid var(--border-light)',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Subtle decorative tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <span className="badge-gold">
            <Sparkles size={13} />
            <span>The 2026 Curated Collection</span>
          </span>
        </div>

        {/* Animated Serif Headline */}
        <h1 className="animated-title" style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: '20px'
        }}>
          Journeys Crafted for the Discerning Soul
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          maxWidth: '680px',
          margin: '0 auto 40px',
          color: 'var(--text-muted)',
          lineHeight: 1.6
        }}>
          Immerse in private temple sunrises, cliffside Mediterranean villas, and pristine alpine retreats curated with understated elegance.
        </p>

        {/* Search & Booking Control Card */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)',
          padding: '24px',
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Quick Category Selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '14px'
          }}>
            <button
              onClick={() => { setActiveTab('packages'); onSelectTab('packages'); }}
              style={tabButtonStyle(activeTab === 'packages')}
            >
              <Compass size={16} />
              <span>Tour Escapes</span>
            </button>
            <button
              onClick={() => { setActiveTab('hotels'); onSelectTab('hotels'); }}
              style={tabButtonStyle(activeTab === 'hotels')}
            >
              <Hotel size={16} />
              <span>Luxury Stays</span>
            </button>
            <button
              onClick={() => { setActiveTab('flights'); onSelectTab('flights'); }}
              style={tabButtonStyle(activeTab === 'flights')}
            >
              <Plane size={16} />
              <span>Bespoke Flights</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSearchSubmit} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) 120px',
            gap: '12px',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <MapPin size={17} style={inputIconStyle} />
              <input
                type="text"
                placeholder={activeTab === 'hotels' ? "City (e.g. Kyoto, Positano)" : activeTab === 'flights' ? "Route (e.g. JFK, Tokyo)" : "Destination or Country"}
                className="input-aesthetic"
                style={{ paddingLeft: '40px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeTab === 'packages' && (
              <div style={{ position: 'relative' }}>
                <select
                  className="input-aesthetic"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="All">All Experiences</option>
                  <option value="Luxury">Luxury & Palaces</option>
                  <option value="Romantic">Romantic Escapes</option>
                  <option value="Nature">Nature & Safari</option>
                  <option value="Cultural">Cultural Heritage</option>
                  <option value="Adventure">High Adventure</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn-gold" style={{ height: '46px', width: '100%' }}>
              <Search size={16} />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Minimalist Stats Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '40px',
          marginTop: '45px',
          paddingTop: '25px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
              4.98 ★
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Guest Satisfaction
            </div>
          </div>
          <div style={{ width: '1px', background: 'var(--border-light)' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
              100%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Handpicked Sanctuaries
            </div>
          </div>
          <div style={{ width: '1px', background: 'var(--border-light)' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
              24 / 7
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Bespoke Concierge
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 18px',
  borderRadius: 'var(--radius-full)',
  border: 'none',
  background: isActive ? 'var(--accent-gold-subtle)' : 'transparent',
  color: isActive ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
  fontWeight: isActive ? 600 : 400,
  fontSize: '0.88rem',
  cursor: 'pointer',
  transition: 'all 0.2s'
});

const inputIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'var(--text-light)',
  pointerEvents: 'none'
};
