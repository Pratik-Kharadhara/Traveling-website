import { TourPackage, Hotel, Flight, Booking, ReviewItem, User } from '../types';

const API_BASE = 'http://localhost:5000/api';

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('aurelia_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(name: string, email: string, password: string, role?: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Packages
  async getPackages(filter?: { category?: string; search?: string; minPrice?: number; maxPrice?: number }): Promise<TourPackage[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.category && filter.category !== 'All') params.append('category', filter.category);
      if (filter?.search) params.append('search', filter.search);
      if (filter?.minPrice) params.append('minPrice', String(filter.minPrice));
      if (filter?.maxPrice) params.append('maxPrice', String(filter.maxPrice));

      const res = await fetch(`${API_BASE}/packages?${params.toString()}`);
      const data = await res.json();
      if (data.success) return data.data;
      return [];
    } catch (e) {
      console.warn('API getPackages fallback:', e);
      return [];
    }
  },

  async createPackage(pkgData: any) {
    const res = await fetch(`${API_BASE}/packages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(pkgData)
    });
    return res.json();
  },

  async updatePackage(id: string, pkgData: any) {
    const res = await fetch(`${API_BASE}/packages/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(pkgData)
    });
    return res.json();
  },

  async deletePackage(id: string) {
    const res = await fetch(`${API_BASE}/packages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Bookings
  async createBooking(bookingData: Partial<Booking>) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },

  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const res = await fetch(`${API_BASE}/bookings/user/${userId}`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      return data.success ? data.data : [];
    } catch {
      return [];
    }
  },

  async getAllBookings(): Promise<Booking[]> {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      return data.success ? data.data : [];
    } catch {
      return [];
    }
  },

  async updateBookingStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async deleteBooking(id: string) {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Hotels & Flights
  async getHotels(city?: string): Promise<Hotel[]> {
    try {
      const url = city ? `${API_BASE}/hotels?city=${encodeURIComponent(city)}` : `${API_BASE}/hotels`;
      const res = await fetch(url);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch {
      return [];
    }
  },

  async getFlights(from?: string, to?: string, travelClass?: string): Promise<Flight[]> {
    try {
      const params = new URLSearchParams();
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      if (travelClass && travelClass !== 'All') params.append('travelClass', travelClass);
      const res = await fetch(`${API_BASE}/flights?${params.toString()}`);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch {
      return [];
    }
  },

  // Reviews & Inquiries
  async getReviews(): Promise<ReviewItem[]> {
    try {
      const res = await fetch(`${API_BASE}/reviews`);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch {
      return [];
    }
  },

  async createReview(reviewData: any) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData)
    });
    return res.json();
  },

  async likeReview(id: string) {
    const res = await fetch(`${API_BASE}/reviews/${id}/like`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async submitInquiry(inquiryData: any) {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    return res.json();
  },

  // Admin
  async getAdminMetrics() {
    try {
      const res = await fetch(`${API_BASE}/admin/metrics`, { headers: getAuthHeaders() });
      return res.json();
    } catch {
      return { success: false };
    }
  },

  async getAdminUsers(): Promise<User[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/users`, { headers: getAuthHeaders() });
      const data = await res.json();
      return data.success ? data.data : [];
    } catch {
      return [];
    }
  },

  async deleteAdminUser(id: string) {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
