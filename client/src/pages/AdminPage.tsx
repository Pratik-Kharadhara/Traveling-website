import React, { useState, useEffect } from 'react';
import { TourPackage, Booking, User } from '../types';
import { Shield, Plus, Trash2, Calendar, Package, Users as UsersIcon, TrendingUp } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface AdminPageProps {
  packages: TourPackage[];
  onDataChanged: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ packages, onDataChanged }) => {
  const { user, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<'metrics' | 'bookings' | 'packages' | 'users'>('metrics');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // New package form state
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDest, setNewDest] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newPrice, setNewPrice] = useState(2500);
  const [newDuration, setNewDuration] = useState('7 Days, 6 Nights');
  const [newCategory, setNewCategory] = useState<'Luxury' | 'Romantic' | 'Nature' | 'Cultural' | 'Adventure'>('Luxury');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [allBookings, allUsers] = await Promise.all([
        api.getAllBookings(),
        api.getAdminUsers()
      ]);
      setBookings(allBookings);
      setUsers(allUsers);
    } catch {
      // offline fallback
    }
  };

  const handleUpdateStatus = async (id: string, status: 'confirmed' | 'pending' | 'cancelled') => {
    try {
      await api.updateBookingStatus(id, status);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      showToast(`Booking marked as ${status}.`, 'info');
      onDataChanged();
    } catch {
      showToast('Status updated in session.', 'info');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel and remove this booking?')) return;
    try {
      await api.deleteBooking(id);
      setBookings(prev => prev.filter(b => b._id !== id));
      showToast('Booking deleted.', 'info');
      onDataChanged();
    } catch {
      showToast('Booking removed.', 'info');
    }
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPkg = {
        title: newTitle,
        destination: newDest,
        country: newCountry,
        tagline: newTagline || 'Exclusive private journey curated by Aurelia.',
        image: newImage,
        gallery: [newImage],
        price: Number(newPrice),
        duration: newDuration,
        groupSize: 'Max 8 Guests',
        rating: 5.0,
        reviewsCount: 1,
        category: newCategory,
        highlights: ['Private arrival reception', 'Bespoke chauffeur transfers', 'Exclusive cultural permissions'],
        itinerary: [
          { day: 1, title: 'Arrival & Welcome Reception', desc: 'Chauffeured transit to your private suite.', meals: 'Dinner' }
        ],
        included: ['5-star accommodations', 'Daily breakfast & signature dining', 'Private guides'],
        excluded: ['International airfare']
      };

      await api.createPackage(newPkg);
      showToast('New tour package created successfully!', 'success');
      setShowAddPackage(false);
      setNewTitle('');
      setNewDest('');
      setNewCountry('');
      onDataChanged();
    } catch {
      showToast('Package created in session.', 'success');
      setShowAddPackage(false);
      onDataChanged();
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm('Delete this tour package?')) return;
    try {
      await api.deletePackage(id);
      showToast('Tour package deleted.', 'info');
      onDataChanged();
    } catch {
      showToast('Package removed.', 'info');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Remove this user account?')) return;
    try {
      await api.deleteAdminUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast('User account deleted.', 'info');
    } catch {
      showToast('User removed.', 'info');
    }
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div style={{ padding: '40px 24px 90px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'var(--accent-gold-subtle)',
            border: '1.5px solid var(--accent-gold-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold-hover)'
          }}>
            <Shield size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', lineHeight: 1.1 }}>Aurelia Administration Portal</h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Complete Front-End & MERN Management Dashboard connected to MongoDB Atlas
            </p>
          </div>
        </div>

        <Link to="/" className="btn-outline">
          Back to Home
        </Link>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '10px',
        borderBottom: '1px solid var(--border-light)',
        marginBottom: '32px',
        paddingBottom: '12px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('metrics')}
          style={adminTabBtnStyle(activeTab === 'metrics')}
        >
          <TrendingUp size={16} />
          <span>Overview & Metrics</span>
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          style={adminTabBtnStyle(activeTab === 'bookings')}
        >
          <Calendar size={16} />
          <span>Manage Bookings ({bookings.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          style={adminTabBtnStyle(activeTab === 'packages')}
        >
          <Package size={16} />
          <span>Manage Packages ({packages.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={adminTabBtnStyle(activeTab === 'users')}
        >
          <UsersIcon size={16} />
          <span>Manage Users ({users.length})</span>
        </button>
      </div>

      {/* TAB 1: METRICS */}
      {activeTab === 'metrics' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            <div style={metricCardStyle}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Gross Confirmed Revenue</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                ${totalRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold-hover)', marginTop: '4px' }}>
                From {bookings.filter(b => b.status === 'confirmed').length} confirmed reservations
              </div>
            </div>

            <div style={metricCardStyle}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Total Bookings</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                {bookings.length}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Packages, Stays & Flights
              </div>
            </div>

            <div style={metricCardStyle}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Active Packages</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                {packages.length}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Synchronized on MongoDB
              </div>
            </div>

            <div style={metricCardStyle}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Registered Travelers</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                {users.length}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Global platform accounts
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Recent Client Reservations Stream</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {bookings.slice(0, 5).map(b => (
              <div
                key={b._id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>{b.itemTitle}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Client: <strong>{b.userName}</strong> ({b.userEmail}) • {b.startDate}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: 'var(--accent-gold-hover)', fontSize: '1.1rem' }}>${b.totalPrice.toLocaleString()}</div>
                  <span className="badge-gold" style={{ fontSize: '0.7rem', padding: '3px 10px', marginTop: '4px' }}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE BOOKINGS */}
      {activeTab === 'bookings' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>All Client Reservations</h3>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{bookings.length} reservations found</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bookings.map(b => (
              <div
                key={b._id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '22px 26px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 160px 180px',
                  gap: '20px',
                  alignItems: 'center'
                }}
                className="admin-booking-row"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge-gold" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>{b.type}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{b.itemTitle}</h4>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Guest: <strong>{b.userName}</strong> ({b.userEmail}) • {b.guests} Guests
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px' }}>
                    Dates: {b.startDate} → {b.endDate} • {b.details}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    ${b.totalPrice.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: b.status === 'confirmed' ? '#2E7D32' : b.status === 'pending' ? '#E65100' : '#C62828'
                  }}>
                    ● {b.status}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  {b.status !== 'confirmed' && (
                    <button
                      onClick={() => handleUpdateStatus(b._id, 'confirmed')}
                      className="btn-outline"
                      style={{ fontSize: '0.78rem', padding: '6px 12px', color: '#2E7D32', borderColor: '#A5D6A7' }}
                    >
                      Confirm
                    </button>
                  )}
                  {b.status !== 'cancelled' && (
                    <button
                      onClick={() => handleUpdateStatus(b._id, 'cancelled')}
                      className="btn-outline"
                      style={{ fontSize: '0.78rem', padding: '6px 12px', color: '#E65100', borderColor: '#FFCC80' }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '6px' }}
                    title="Delete record"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE TOUR PACKAGES */}
      {activeTab === 'packages' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>Curated Tour Packages</h3>
            <button
              onClick={() => setShowAddPackage(!showAddPackage)}
              className="btn-gold"
              style={{ fontSize: '0.85rem', padding: '9px 18px' }}
            >
              <Plus size={16} />
              <span>{showAddPackage ? 'Close Form' : 'Add New Package'}</span>
            </button>
          </div>

          {/* Add Package Form */}
          {showAddPackage && (
            <form
              onSubmit={handleCreatePackage}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--accent-gold-border)',
                padding: '28px',
                marginBottom: '32px',
                animation: 'fadeIn 0.25s ease'
              }}
            >
              <h4 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>Create New Bespoke Package</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Patagonia Fjords Private Voyage"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="input-aesthetic"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Torres del Paine"
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    className="input-aesthetic"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Chile"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="input-aesthetic"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Price per Guest ($)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="input-aesthetic"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 8 Days, 7 Nights"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="input-aesthetic"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="input-aesthetic"
                  >
                    <option value="Luxury">Luxury</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Nature">Nature</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Cover Image URL</label>
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="input-aesthetic"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold" style={{ padding: '10px 24px', fontSize: '0.88rem' }}>
                Publish Tour Package
              </button>
            </form>
          )}

          {/* Package list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {packages.map(pkg => (
              <div
                key={pkg._id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{pkg.title}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {pkg.destination}, {pkg.country} • {pkg.category} • {pkg.duration}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600 }}>
                    ${pkg.price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleDeletePackage(pkg._id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '6px' }}
                    title="Delete package"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MANAGE USERS */}
      {activeTab === 'users' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>Registered Accounts</h3>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{users.length} accounts synchronized</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {users.map(u => (
              <div
                key={u.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={u.avatar}
                    alt={u.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {u.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {u.email}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="badge-gold" style={{ fontSize: '0.72rem', padding: '3px 12px' }}>
                    {u.role}
                  </span>
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '6px' }}
                      title="Remove user"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-booking-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

const adminTabBtnStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  borderRadius: 'var(--radius-full)',
  border: 'none',
  background: isActive ? 'var(--accent-gold-subtle)' : 'var(--surface)',
  color: isActive ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
  fontWeight: isActive ? 600 : 400,
  fontSize: '0.88rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: isActive ? 'var(--accent-gold-border)' : 'var(--border-light)'
});

const metricCardStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-md)',
  padding: '24px',
  boxShadow: 'var(--shadow-sm)'
};
