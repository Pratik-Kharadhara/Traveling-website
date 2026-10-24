import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, User as UserIcon, Shield, Menu, X, LogOut, Bookmark, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(250, 248, 245, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Monogram */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          onClick={closeMobile}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '1.5px solid var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--surface)'
          }}>
            <Compass size={22} color="var(--accent-gold)" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'var(--text-main)',
              lineHeight: 1
            }}>
              A U R E L I A
            </div>
            <div style={{
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              fontWeight: 500,
              marginTop: '3px'
            }}>
              Bespoke Escapes
            </div>
          </div>
        </Link>

        {/* Multipage Desktop Nav Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '24px'
        }} className="desktop-nav">
          <NavLink to="/" style={({ isActive }) => navLinkStyle(isActive)}>Home</NavLink>
          <NavLink to="/destinations" style={({ isActive }) => navLinkStyle(isActive)}>Destinations</NavLink>
          <NavLink to="/hotels" style={({ isActive }) => navLinkStyle(isActive)}>Stays</NavLink>
          <NavLink to="/flights" style={({ isActive }) => navLinkStyle(isActive)}>Flights</NavLink>
          <NavLink to="/itinerary" style={({ isActive }) => navLinkStyle(isActive)}>Itinerary Planner</NavLink>
          <NavLink to="/gallery" style={({ isActive }) => navLinkStyle(isActive)}>Gallery</NavLink>
          <NavLink to="/reviews" style={({ isActive }) => navLinkStyle(isActive)}>Reviews</NavLink>
          <NavLink to="/contact" style={({ isActive }) => navLinkStyle(isActive)}>Concierge</NavLink>
        </nav>

        {/* User / Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Admin Panel Link */}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="btn-outline"
              style={{
                fontSize: '0.8rem',
                padding: '6px 14px',
                borderColor: 'var(--accent-gold)',
                color: 'var(--accent-gold-hover)',
                backgroundColor: 'var(--accent-gold-subtle)',
                textDecoration: 'none'
              }}
            >
              <Shield size={14} />
              <span>Admin Panel</span>
            </Link>
          )}

          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)' }}>
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {userDropdown && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '115%',
                  width: '230px',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-light)',
                  padding: '8px',
                  zIndex: 200
                }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    <span className="badge-gold" style={{ fontSize: '0.65rem', marginTop: '6px' }}>
                      {user.role}
                    </span>
                  </div>

                  <button
                    onClick={() => { setUserDropdown(false); navigate('/my-bookings'); }}
                    style={dropdownItemStyle}
                  >
                    <Bookmark size={15} />
                    <span>My Reservations</span>
                  </button>

                  <button
                    onClick={() => { setUserDropdown(false); navigate('/itinerary'); }}
                    style={dropdownItemStyle}
                  >
                    <Compass size={15} />
                    <span>My Itinerary Builder</span>
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => { setUserDropdown(false); navigate('/admin'); }}
                      style={dropdownItemStyle}
                    >
                      <Shield size={15} />
                      <span>Admin Management</span>
                    </button>
                  )}

                  <button
                    onClick={() => { setUserDropdown(false); logout(); }}
                    style={{ ...dropdownItemStyle, color: '#C53030' }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="btn-gold"
              style={{ fontSize: '0.85rem', padding: '8px 18px' }}
            >
              <UserIcon size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'inline-flex',
              padding: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-main)'
            }}
            className="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-light)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Link to="/" onClick={closeMobile} style={mobileNavLinkStyle}>Home</Link>
          <Link to="/destinations" onClick={closeMobile} style={mobileNavLinkStyle}>Destinations & Escapes</Link>
          <Link to="/hotels" onClick={closeMobile} style={mobileNavLinkStyle}>Luxury Stays</Link>
          <Link to="/flights" onClick={closeMobile} style={mobileNavLinkStyle}>Bespoke Flights</Link>
          <Link to="/itinerary" onClick={closeMobile} style={mobileNavLinkStyle}>Itinerary Planner</Link>
          <Link to="/gallery" onClick={closeMobile} style={mobileNavLinkStyle}>Photo Gallery</Link>
          <Link to="/reviews" onClick={closeMobile} style={mobileNavLinkStyle}>Traveler Reviews</Link>
          <Link to="/contact" onClick={closeMobile} style={mobileNavLinkStyle}>Private Concierge</Link>
          {user && (
            <Link to="/my-bookings" onClick={closeMobile} style={mobileNavLinkStyle}>
              My Reservations
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={closeMobile} style={{ ...mobileNavLinkStyle, color: 'var(--accent-gold-hover)' }}>
              Admin Management Portal
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
  textDecoration: 'none',
  fontSize: '0.86rem',
  color: isActive ? 'var(--accent-gold-hover)' : 'var(--text-main)',
  fontFamily: 'var(--font-sans)',
  fontWeight: isActive ? 600 : 400,
  letterSpacing: '0.02em',
  padding: '6px 0',
  borderBottom: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
  transition: 'all 0.2s ease'
});

const mobileNavLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  fontSize: '1.05rem',
  color: 'var(--text-main)',
  padding: '10px 0',
  fontFamily: 'var(--font-serif)',
  borderBottom: '1px solid var(--border-subtle)'
};

const dropdownItemStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 12px',
  background: 'transparent',
  border: 'none',
  fontSize: '0.85rem',
  color: 'var(--text-main)',
  cursor: 'pointer',
  borderRadius: 'var(--radius-sm)',
  textAlign: 'left',
  textDecoration: 'none'
};
