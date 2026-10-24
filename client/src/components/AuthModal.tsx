import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, quickLogin } = useAuth();
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'traveler' | 'admin'>('traveler');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.message || 'Login failed. Please check credentials.');
        }
      } else {
        const res = await register(name, email, password, role);
        if (!res.success) {
          setErrorMsg(res.message || 'Registration failed.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '460px',
          padding: '32px',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        {/* Brand Monogram */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.12em' }}>
            A U R E L I A
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {mode === 'signin' ? 'Sign in to access your curated journeys' : 'Join Aurelia’s inner circle of travelers'}
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          border: '1px solid var(--border-light)',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600, marginBottom: '8px' }}>
            Instant Evaluation (One-Click Demo)
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => quickLogin('admin')}
              className="btn-outline"
              style={{ flex: 1, padding: '6px 10px', fontSize: '0.76rem', borderColor: 'var(--accent-gold)' }}
            >
              <Shield size={13} color="var(--accent-gold)" />
              <span>Admin Demo</span>
            </button>
            <button
              type="button"
              onClick={() => quickLogin('traveler')}
              className="btn-outline"
              style={{ flex: 1, padding: '6px 10px', fontSize: '0.76rem' }}
            >
              <UserIcon size={13} />
              <span>Traveler Demo</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-light)',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: mode === 'signin' ? '2px solid var(--accent-gold)' : '2px solid transparent',
              fontWeight: mode === 'signin' ? 600 : 400,
              color: mode === 'signin' ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: mode === 'register' ? '2px solid var(--accent-gold)' : '2px solid transparent',
              fontWeight: mode === 'register' ? 600 : 400,
              color: mode === 'register' ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: '#FEE2E2',
            color: '#B91C1C',
            fontSize: '0.8rem',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Eleanor Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-aesthetic"
                required
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="traveler@oasis.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-aesthetic"
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-aesthetic"
              required
            />
          </div>

          {mode === 'register' && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Account Purpose
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="input-aesthetic"
              >
                <option value="traveler">Traveler / Private Client</option>
                <option value="admin">Administrator / Tour Operator</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: '100%', padding: '12px', marginTop: '6px' }}
          >
            <span>{loading ? 'Authenticating...' : mode === 'signin' ? 'Enter Sanctuary' : 'Create Membership'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
