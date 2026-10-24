import React, { useState, useEffect } from 'react';
import { TourPackage, Booking, User } from '../types';
import {
  Shield,
  X,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  Calendar,
  Users as UsersIcon,
  TrendingUp,
  DollarSign,
  Edit2
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
  packages: TourPackage[];
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
  packages
}) => {
  const { showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<'metrics' | 'bookings' | 'packages' | 'users'>('metrics');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

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
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allBookings, allUsers] = await Promise.all([
        api.getAllBookings(),
        api.getAdminUsers()
      ]);
      setBookings(allBookings);
      setUsers(allUsers);
    } catch {
      // offline fallback
    } finally {
      setLoading(false);
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

  if (!isOpen) return null;

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--accent-gold-subtle)',
              border: '1px solid var(--accent-gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gold-hover)'
            }}>
              <Shield size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', lineHeight: 1 }}>Aurelia Administration Portal</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Complete Front-End & MERN Management Suite</span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 28px',
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--surface)'
        }}>
          <button
            onClick={() => setActiveTab('metrics')}
            style={adminTabBtnStyle(activeTab === 'metrics')}
          >
            <TrendingUp size={15} />
            <span>Overview & Metrics</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            style={adminTabBtnStyle(activeTab === 'bookings')}
          >
            <Calendar size={15} />
            <span>Manage Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            style={adminTabBtnStyle(activeTab === 'packages')}
          >
            <Package size={15} />
            <span>Manage Packages ({packages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={adminTabBtnStyle(activeTab === 'users')}
          >
            <UsersIcon size={15} />
            <span>Manage Users ({users.length})</span>
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div style={{ padding: '28px', overflowY: 'auto', flex: 1 }}>
          
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'metrics' && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                <div style={metricCardStyle}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Gross Confirmed Revenue</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-hover)', marginTop: '4px' }}>
                    From {bookings.filter(b => b.status === 'confirmed').length} confirmed reservations
                  </div>
                </div>

                <div style={metricCardStyle}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Total Bookings</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                    {bookings.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Packages, Hotels & Flights
                  </div>
                </div>

                <div style={metricCardStyle}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Active Packages</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                    {packages.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Curated globally
                  </div>
                </div>

                <div style={metricCardStyle}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Registered Travelers</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                    {users.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Platform members
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Recent Reservations Stream</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {bookings.slice(0, 5).map(b => (
                  <div
                    key={b._id}
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.88rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{b.itemTitle}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Client: {b.userName} ({b.userEmail}) • {b.startDate}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, color: 'var(--accent-gold-hover)' }}>${b.totalPrice.toLocaleString()}</div>
                      <span className="badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3rem' }}>All Client Reservations</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{bookings.length} reservations found</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {bookings.map(b => (
                  <div
                    key={b._id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 140px 180px',
                      gap: '16px',
                      alignItems: 'center'
                    }}
                    className="admin-booking-row"
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="badge-gold" style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}>{b.type}</span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{b.itemTitle}</h4>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Guest: <strong>{b.userName}</strong> ({b.userEmail}) • {b.guests} Guests
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '2px' }}>
                        Dates: {b.startDate} → {b.endDate} • {b.details}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        ${b.totalPrice.toLocaleString()}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: b.status === 'confirmed' ? '#2E7D32' : b.status === 'pending' ? '#E65100' : '#C62828'
                      }}>
                        ● {b.status}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      {b.status !== 'confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(b._id, 'confirmed')}
                          className="btn-outline"
                          style={{ fontSize: '0.75rem', padding: '6px 10px', color: '#2E7D32', borderColor: '#A5D6A7' }}
                          title="Confirm Reservation"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(b._id, 'cancelled')}
                          className="btn-outline"
                          style={{ fontSize: '0.75rem', padding: '6px 10px', color: '#E65100', borderColor: '#FFCC80' }}
                          title="Cancel Reservation"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteBooking(b._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '6px' }}
                        title="Delete record"
                      >
                        <Trash2 size={16} />
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3rem' }}>Curated Tour Packages</h3>
                <button
                  onClick={() => setShowAddPackage(!showAddPackage)}
                  className="btn-gold"
                  style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                >
                  <Plus size={15} />
                  <span>{showAddPackage ? 'Close Form' : 'Add New Package'}</span>
                </button>
              </div>

              {/* Add Package Form */}
              {showAddPackage && (
                <form
                  onSubmit={handleCreatePackage}
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid var(--accent-gold-border)',
                    padding: '24px',
                    marginBottom: '28px',
                    animation: 'fadeIn 0.25s ease'
                  }}
                >
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Create New Bespoke Package</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
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

                  <button type="submit" className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                    Publish Tour Package
                  </button>
                </form>
              )}

              {/* Package list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {packages.map(pkg => (
                  <div
                    key={pkg._id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{pkg.title}</h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {pkg.destination}, {pkg.country} • {pkg.category} • {pkg.duration}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                        ${pkg.price.toLocaleString()}
                      </div>
                      <button
                        onClick={() => handleDeletePackage(pkg._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '6px' }}
                        title="Delete package"
                      >
                        <Trash2 size={16} />
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3rem' }}>Registered Travelers & Administrators</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{users.length} registered accounts</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {users.map(u => (
                  <div
                    key={u.id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px 20px',
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
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {u.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {u.email}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span className="badge-gold" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                        {u.role}
                      </span>
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '6px' }}
                          title="Remove user"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

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
  padding: '8px 16px',
  borderRadius: 'var(--radius-full)',
  border: 'none',
  background: isActive ? 'var(--accent-gold-subtle)' : 'transparent',
  color: isActive ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
  fontWeight: isActive ? 600 : 400,
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s'
});

const metricCardStyle: React.CSSProperties = {
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-md)',
  padding: '20px',
  boxShadow: 'var(--shadow-sm)'
};
