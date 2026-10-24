import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TourPackage, Hotel } from '../types';
import { Compass, Sparkles, MapPin, Star, ArrowRight, ShieldCheck, HeartHandshake, Award, Hotel as HotelIcon, Plane } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';

interface HomePageProps {
  packages: TourPackage[];
  hotels: Hotel[];
}

export const HomePage: React.FC<HomePageProps> = ({ packages, hotels }) => {
  const navigate = useNavigate();

  const handleSearch = (query: string, category?: string) => {
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (category && category !== 'All') params.append('category', category);
    navigate(`/destinations?${params.toString()}`);
  };

  const handleSelectTab = (tab: 'packages' | 'hotels' | 'flights') => {
    if (tab === 'hotels') navigate('/hotels');
    else if (tab === 'flights') navigate('/flights');
    else navigate('/destinations');
  };

  const featuredPackages = packages.slice(0, 3);
  const featuredHotels = hotels.slice(0, 2);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        onSearch={handleSearch}
        onSelectTab={handleSelectTab}
      />

      {/* Why Aurelia Pillar Strip */}
      <section style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border-light)',
        padding: '50px 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={pillarIconBox}>
              <ShieldCheck size={22} color="var(--accent-gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '6px', fontWeight: 600 }}>Uncompromising Privacy</h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Discreet private aviation charters, sequestered villas, and anonymous customs clearances handled seamlessly.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={pillarIconBox}>
              <Award size={22} color="var(--accent-gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '6px', fontWeight: 600 }}>100% Handpicked Sanctuaries</h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Every ryokan, palazzo, and chalet is personally vetted by senior cultural specialists for authentic excellence.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={pillarIconBox}>
              <HeartHandshake size={22} color="var(--accent-gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '6px', fontWeight: 600 }}>24/7 Bespoke Concierge</h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                A dedicated private travel director remains on-call throughout your entire international expedition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tour Escapes Preview */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="badge-gold">
              <Sparkles size={13} />
              <span>Signature Itineraries</span>
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginTop: '10px' }}>
              Curated Private Journeys
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px' }}>
              Handcrafted voyages pairing private charters with privileged temple and palace permissions.
            </p>
          </div>

          <Link to="/destinations" className="btn-outline">
            <span>Explore All Escapes</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px'
        }}>
          {featuredPackages.map(pkg => (
            <div
              key={pkg._id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition-smooth)'
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
                  src={pkg.image}
                  alt={pkg.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span className="badge-gold" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                    {pkg.category}
                  </span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(30, 25, 20, 0.75)',
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
                  <span style={{ fontWeight: 600 }}>{pkg.rating.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-hover)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '6px' }}>
                    {pkg.destination}, {pkg.country}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', lineHeight: 1.3 }}>
                    {pkg.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    {pkg.tagline}
                  </p>
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
                      From
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      ${pkg.price.toLocaleString()}
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-muted)' }}> / guest</span>
                    </div>
                  </div>

                  <Link
                    to={`/packages/${pkg._id}`}
                    className="btn-gold"
                    style={{ padding: '8px 16px', fontSize: '0.84rem', textDecoration: 'none' }}
                  >
                    <span>View Itinerary</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Stays & Flights Double Banner */}
      <section style={{ padding: '40px 24px 80px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span className="badge-gold">Elevated Services</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginTop: '10px' }}>
              Sanctuaries, Stays & Private Aviation
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}>
            {/* Stays Card */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <HotelIcon size={24} color="var(--accent-gold)" />
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Handpicked Luxury Stays</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Reserve private cliffside suites in Positano, historic tatami pavilions in Kyoto, and secluded alpine chalets in the Swiss Alps.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', fontSize: '0.85rem' }}>
                  <div>✦ The Ritz-Carlton Kyoto (River View Suites)</div>
                  <div>✦ Le Sirenuse Positano (Penthouse Cliffside)</div>
                  <div>✦ The Chedi Andermatt (Thermal Chalets)</div>
                </div>
              </div>
              <Link to="/hotels" className="btn-gold" style={{ alignSelf: 'flex-start', textDecoration: 'none' }}>
                <span>Browse Luxury Stays</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Flights Card */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Plane size={24} color="var(--accent-gold)" />
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Premier Aviation & Charters</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Fly First and Business Class on Emirates, Singapore Airlines, Qatar Airways, and Lufthansa with private suites and lie-flat comfort.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', fontSize: '0.85rem' }}>
                  <div>✦ Interactive Lie-Flat & Window Suite Selection</div>
                  <div>✦ Complimentary Lounge Access & Fast-Track Tarmac</div>
                  <div>✦ Flexible One-Way & Round-Trip Global Itineraries</div>
                </div>
              </div>
              <Link to="/flights" className="btn-gold" style={{ alignSelf: 'flex-start', textDecoration: 'none' }}>
                <span>Search Flights</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Planner Banner */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #272320 0%, #1A1715 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '60px 40px',
          color: '#FAF8F5',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '40px',
          alignItems: 'center'
        }} className="itinerary-banner-grid">
          <div>
            <span className="badge-gold" style={{ background: 'rgba(255,255,255,0.1)', color: '#D4B892', borderColor: 'rgba(212,184,146,0.3)' }}>
              Interactive Expedition Architect
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#FAF8F5', marginTop: '14px', marginBottom: '14px' }}>
              Design Your Day-by-Day Odyssey
            </h2>
            <p style={{ color: '#D4C9BC', fontSize: '0.95rem', maxWidth: '640px', lineHeight: 1.6 }}>
              Tailor each morning excursion, twilight catamaran sail, and private sommelier pairing. Our dynamic builder calculates your live expedition budget.
            </p>
          </div>

          <Link to="/itinerary" className="btn-gold" style={{ padding: '14px 28px', fontSize: '0.95rem', textDecoration: 'none' }}>
            <span>Launch Itinerary Planner</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .itinerary-banner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

const pillarIconBox: React.CSSProperties = {
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  background: 'var(--accent-gold-subtle)',
  border: '1px solid var(--accent-gold-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};
