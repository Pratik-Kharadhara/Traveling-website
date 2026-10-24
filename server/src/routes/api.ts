import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} from '../controllers/packageController';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController';
import { getHotels, getFlights } from '../controllers/hotelFlightController';
import {
  getReviews,
  createReview,
  likeReview,
  submitInquiry
} from '../controllers/reviewInquiryController';
import {
  getAdminMetrics,
  getAdminUsers,
  deleteAdminUser
} from '../controllers/adminController';

const router = Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', getMe);

// Tour Packages
router.get('/packages', getPackages);
router.get('/packages/:id', getPackageById);
router.post('/packages', createPackage);
router.put('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

// Bookings
router.post('/bookings', createBooking);
router.get('/bookings/user/:userId', getUserBookings);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id/status', updateBookingStatus);
router.delete('/bookings/:id', deleteBooking);

// Hotels & Flights
router.get('/hotels', getHotels);
router.get('/flights', getFlights);

// Reviews & Inquiries
router.get('/reviews', getReviews);
router.post('/reviews', createReview);
router.post('/reviews/:id/like', likeReview);
router.post('/inquiries', submitInquiry);

// Admin dashboard routes
router.get('/admin/metrics', getAdminMetrics);
router.get('/admin/users', getAdminUsers);
router.delete('/admin/users/:id', deleteAdminUser);

export default router;
