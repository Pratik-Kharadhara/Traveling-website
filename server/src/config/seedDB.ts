import User from '../models/User';
import Package from '../models/Package';
import Hotel from '../models/Hotel';
import Flight from '../models/Flight';
import Review from '../models/Review';
import Booking from '../models/Booking';
import {
  initialPackages,
  initialHotels,
  initialFlights,
  initialReviews,
  initialBookings,
  initialUsers
} from '../data/seedData';

export const seedDatabase = async () => {
  try {
    // 1. Seed Packages
    const packageCount = await Package.countDocuments();
    if (packageCount === 0) {
      console.log('[MongoDB Seeder] Seeding initial tour packages...');
      await Package.insertMany(initialPackages.map(p => ({
        _id: p._id,
        title: p.title,
        destination: p.destination,
        country: p.country,
        tagline: p.tagline,
        image: p.image,
        gallery: p.gallery,
        price: p.price,
        duration: p.duration,
        groupSize: p.groupSize,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        category: p.category,
        highlights: p.highlights,
        itinerary: p.itinerary,
        included: p.included,
        excluded: p.excluded,
        featured: p.featured || false
      })));
    }

    // 2. Seed Hotels
    const hotelCount = await Hotel.countDocuments();
    if (hotelCount === 0) {
      console.log('[MongoDB Seeder] Seeding luxury hotels...');
      await Hotel.insertMany(initialHotels);
    }

    // 3. Seed Flights
    const flightCount = await Flight.countDocuments();
    if (flightCount === 0) {
      console.log('[MongoDB Seeder] Seeding international flights...');
      await Flight.insertMany(initialFlights);
    }

    // 4. Seed Reviews
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      console.log('[MongoDB Seeder] Seeding verified reviews...');
      await Review.insertMany(initialReviews);
    }

    // 5. Seed Users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[MongoDB Seeder] Seeding initial users...');
      await User.insertMany(initialUsers.map(u => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        passwordHash: u.passwordHash,
        role: u.role,
        avatar: u.avatar,
        createdAt: new Date(u.createdAt)
      })));
    }

    // 6. Seed Bookings
    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0) {
      console.log('[MongoDB Seeder] Seeding initial bookings...');
      await Booking.insertMany(initialBookings.map(b => ({
        _id: b._id,
        userId: b.userId,
        userEmail: b.userEmail,
        userName: b.userName,
        type: b.type,
        itemTitle: b.itemTitle,
        details: b.details,
        startDate: b.startDate,
        endDate: b.endDate,
        guests: b.guests,
        totalPrice: b.totalPrice,
        status: b.status,
        createdAt: new Date(b.createdAt)
      })));
    }

    console.log('[MongoDB Seeder] Database check & synchronization complete.');
  } catch (error: any) {
    console.error('[MongoDB Seeder Error]', error.message);
  }
};
