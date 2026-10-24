import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TourPackage } from '../types';
import { Star, Check, ArrowRight, SlidersHorizontal, Compass, Sparkles } from 'lucide-react';

interface DestinationsPageProps {
  packages: TourPackage[];
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ packages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Luxury', 'Romantic', 'Nature', 'Cultural', 'Adventure'];

  const filteredPackages = useMemo(() => {
    return packages
      .filter(pkg => {
        const matchesCategory = selectedCategory === 'All' || pkg.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = !searchQuery ||
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.country.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = pkg.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [packages, selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div style={{ padding: '60px 24px 90px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <span className="badge-gold">
          <Compass size={13} />
          <span>Curated Global Portfolio</span>
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', marginTop: '14px', marginBottom: '14px' }}>
          Iconic Destinations & Private Sanctuaries
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
          Browse our collection of handpicked international tour packages. Each journey includes private chauffeurs, 5-star accommodations, and discreet cultural permissions.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 22px',
        marginBottom: '35px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: selectedCategory === cat ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  background: selectedCategory === cat ? 'var(--accent-gold-subtle)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
                  fontSize: '0.84rem',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-aesthetic"
              style={{ width: 'auto', padding: '8px 14px', fontSize: '0.84rem' }}
            >
              <option value="recommended">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline"
              style={{ fontSize: '0.84rem', padding: '8px 14px' }}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {showFilters && (
          <div style={{
            marginTop: '18px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Search Destinations / Keywords
              </label>
              <input
                type="text"
                placeholder="Search Kyoto, Italy, Alps, Serengeti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-aesthetic"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Max Price per Guest</label>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-gold-hover)' }}>
                  ${maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Package Grid */}
      {filteredPackages.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '70px 20px',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No journeys match your criteria</h3>
          <p>Try resetting filters or expanding your budget range.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setMaxPrice(6000); }}
            className="btn-gold"
            style={{ marginTop: '16px' }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '30px'
        }}>
          {filteredPackages.map(pkg => (
            <div
              key={pkg._id}
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
                  src={pkg.image}
                  alt={pkg.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  display: 'flex',
                  gap: '6px'
                }}>
                  <span className="badge-gold" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                    {pkg.category}
                  </span>
                  {pkg.featured && (
                    <span className="badge-gold" style={{ background: 'var(--accent-gold)', color: '#FFFFFF', borderColor: 'transparent' }}>
                      Curator's Pick
                    </span>
                  )}
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
                  <span style={{ opacity: 0.8 }}>({pkg.reviewsCount})</span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                    {pkg.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        <Check size={14} color="var(--accent-gold)" />
                        <span>{highlight}</span>
                      </div>
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
                      All-Inclusive From
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      ${pkg.price.toLocaleString()}
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-muted)' }}> / guest</span>
                    </div>
                  </div>

                  <Link
                    to={`/packages/${pkg._id}`}
                    className="btn-gold"
                    style={{ padding: '8px 18px', fontSize: '0.84rem', textDecoration: 'none' }}
                  >
                    <span>View Itinerary</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
