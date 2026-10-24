import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TourPackage, Hotel, Flight, Booking, ReviewItem } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ScrollToTop } from './components/ScrollToTop';

// Multipage Route Views
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { HotelsPage } from './pages/HotelsPage';
import { FlightsPage } from './pages/FlightsPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { MyBookingsPage } from './pages/MyBookingsPage';

import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { toast } = useAuth();
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);

  const loadData = async () => {
    try {
      const [pkgs, htls, flts, revs, bks] = await Promise.all([
        api.getPackages(),
        api.getHotels(),
        api.getFlights(),
        api.getReviews(),
        api.getAllBookings()
      ]);
      if (pkgs.length > 0) setPackages(pkgs);
      if (htls.length > 0) setHotels(htls);
      if (flts.length > 0) setFlights(flts);
      if (revs.length > 0) setReviews(revs);
      if (bks.length > 0) setAllBookings(bks);
    } catch (err) {
      console.warn('Initial data loading fallback:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
        
        {/* Global Toast Alerts */}
        {toast && (
          <div style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'var(--surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 20px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'fadeIn 0.25s ease'
          }}>
            {toast.type === 'success' && <CheckCircle2 size={18} color="#2E7D32" />}
            {toast.type === 'error' && <AlertCircle size={18} color="#C62828" />}
            {toast.type === 'info' && <Info size={18} color="var(--accent-gold)" />}
            <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-main)' }}>
              {toast.message}
            </span>
          </div>
        )}

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Main Routed Content */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage packages={packages} hotels={hotels} />} />
            <Route path="/destinations" element={<DestinationsPage packages={packages} />} />
            <Route path="/packages/:id" element={<PackageDetailPage packages={packages} onBookingSuccess={loadData} />} />
            <Route path="/hotels" element={<HotelsPage hotels={hotels} onBookingSuccess={loadData} />} />
            <Route path="/flights" element={<FlightsPage flights={flights} onBookingSuccess={loadData} />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage reviews={reviews} onReviewAdded={loadData} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage packages={packages} onDataChanged={loadData} />} />
            <Route path="/my-bookings" element={<MyBookingsPage bookings={allBookings} onRefresh={loadData} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Authentication Modal */}
        <AuthModal />

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
