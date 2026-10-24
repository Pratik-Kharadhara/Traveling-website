import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, role?: string) => Promise<{ success: boolean; message?: string }>;
  quickLogin: (role: 'admin' | 'traveler') => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aurelia_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('aurelia_token'));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    if (token && !user) {
      api.getMe().then(res => {
        if (res.success && res.user) {
          setUser(res.user);
          localStorage.setItem('aurelia_user', JSON.stringify(res.user));
        } else {
          logout();
        }
      }).catch(() => {
        // keep current cached user if offline
      });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.login(email, password);
      if (res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('aurelia_token', res.token);
        localStorage.setItem('aurelia_user', JSON.stringify(res.user));
        showToast(`Welcome back, ${res.user.name}`, 'success');
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Unable to connect to server' };
    }
  };

  const register = async (name: string, email: string, password: string, role?: string) => {
    try {
      const res = await api.register(name, email, password, role);
      if (res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('aurelia_token', res.token);
        localStorage.setItem('aurelia_user', JSON.stringify(res.user));
        showToast(`Welcome to Aurelia, ${res.user.name}`, 'success');
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Unable to connect to server' };
    }
  };

  const quickLogin = async (role: 'admin' | 'traveler') => {
    if (role === 'admin') {
      await login('admin@oasis.com', 'admin123');
    } else {
      await login('traveler@oasis.com', 'traveler123');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aurelia_token');
    localStorage.removeItem('aurelia_user');
    showToast('Signed out safely', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        quickLogin,
        logout,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        toast,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
