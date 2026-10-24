import mongoose from 'mongoose';
import {
  initialPackages,
  initialHotels,
  initialFlights,
  initialReviews,
  initialBookings,
  initialUsers,
  TourPackage,
  Hotel,
  Flight,
  ReviewItem
} from '../data/seedData';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Package from '../models/Package';
import Booking from '../models/Booking';
import HotelModel from '../models/Hotel';
import FlightModel from '../models/Flight';
import ReviewModel from '../models/Review';
import InquiryModel from '../models/Inquiry';

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'traveler';
  avatar: string;
  createdAt: string;
}

export interface BookingItem {
  _id: string;
  userId: string;
  userEmail: string;
  userName: string;
  type: 'package' | 'hotel' | 'flight';
  itemTitle: string;
  details: string;
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  destination: string;
  travelDate?: string;
  guests?: number;
  message: string;
  status: 'new' | 'responded';
  createdAt: string;
}

class ResilientStore {
  public packages: TourPackage[] = [...initialPackages];
  public hotels: Hotel[] = [...initialHotels];
  public flights: Flight[] = [...initialFlights];
  public reviews: ReviewItem[] = [...initialReviews];
  public bookings: BookingItem[] = [...initialBookings];
  public users: UserItem[] = [...initialUsers];
  public inquiries: InquiryItem[] = [
    {
      id: "inq-1",
      name: "Victoria Hastings",
      email: "v.hastings@mayfair.co.uk",
      phone: "+44 7911 123456",
      destination: "Swiss Alpine Luxury & Glacier Express",
      travelDate: "2026-12-15",
      guests: 2,
      message: "Looking for customized helicopter transfers and private sommelier pairing for anniversary.",
      status: "new",
      createdAt: "2026-10-23"
    }
  ];

  isMongoActive(): boolean {
    return mongoose.connection.readyState === 1;
  }

  // User management
  async findUserByEmail(email: string) {
    if (this.isMongoActive()) {
      try {
        const u = await User.findOne({ email: email.toLowerCase() });
        if (u) {
          return {
            _id: String(u._id),
            name: u.name,
            email: u.email,
            passwordHash: u.passwordHash,
            role: u.role,
            avatar: u.avatar,
            createdAt: u.createdAt.toISOString()
          };
        }
      } catch (err) {
        console.warn('Mongo findUserByEmail fallback:', err);
      }
    }
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  async findUserById(id: string) {
    if (this.isMongoActive()) {
      try {
        const u = await User.findById(id);
        if (u) {
          return {
            _id: String(u._id),
            name: u.name,
            email: u.email,
            passwordHash: u.passwordHash,
            role: u.role,
            avatar: u.avatar,
            createdAt: u.createdAt.toISOString()
          };
        }
      } catch {
        // fallback
      }
    }
    return this.users.find(u => u._id === id);
  }

  async createUser(userData: { name: string; email: string; password: string; role?: 'admin' | 'traveler'; avatar?: string }) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);
    const avatar = userData.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(userData.name)}`;
    const role = userData.role || 'traveler';
    const email = userData.email.toLowerCase();

    if (this.isMongoActive()) {
      try {
        const dbUser = await User.create({
          name: userData.name,
          email,
          passwordHash,
          role,
          avatar
        });
        const created: UserItem = {
          _id: String(dbUser._id),
          name: dbUser.name,
          email: dbUser.email,
          passwordHash: dbUser.passwordHash,
          role: dbUser.role,
          avatar: dbUser.avatar,
          createdAt: dbUser.createdAt.toISOString()
        };
        this.users.push(created);
        return created;
      } catch (err) {
        console.warn('Mongo createUser fallback:', err);
      }
    }

    const newUser: UserItem = {
      _id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: userData.name,
      email,
      passwordHash,
      role,
      avatar,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(id: string) {
    if (this.isMongoActive()) {
      try {
        await User.findByIdAndDelete(id);
      } catch {
        // ignore
      }
    }
    const initialLen = this.users.length;
    this.users = this.users.filter(u => u._id !== id);
    return this.users.length < initialLen;
  }

  // Packages management
  async getAllPackages(filter?: { category?: string; search?: string; minPrice?: number; maxPrice?: number }) {
    if (this.isMongoActive()) {
      try {
        const query: any = {};
        if (filter?.category && filter.category !== 'All') {
          query.category = filter.category;
        }
        if (filter?.search) {
          query.$or = [
            { title: { $regex: filter.search, $options: 'i' } },
            { destination: { $regex: filter.search, $options: 'i' } },
            { country: { $regex: filter.search, $options: 'i' } }
          ];
        }
        if (filter?.minPrice || filter?.maxPrice) {
          query.price = {};
          if (filter.minPrice) query.price.$gte = filter.minPrice;
          if (filter.maxPrice) query.price.$lte = filter.maxPrice;
        }
        const dbPackages = await Package.find(query);
        if (dbPackages && dbPackages.length > 0) {
          return dbPackages.map(p => ({
            _id: String(p._id),
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
            featured: p.featured
          }));
        }
      } catch (err) {
        console.warn('Mongo getAllPackages fallback:', err);
      }
    }

    let result = [...this.packages];
    if (filter?.category && filter.category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
      );
    }
    if (filter?.minPrice) {
      result = result.filter(p => p.price >= filter.minPrice!);
    }
    if (filter?.maxPrice) {
      result = result.filter(p => p.price <= filter.maxPrice!);
    }
    return result;
  }

  async getPackageById(id: string) {
    if (this.isMongoActive()) {
      try {
        const p = await Package.findById(id);
        if (p) {
          return {
            _id: String(p._id),
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
            featured: p.featured
          };
        }
      } catch {
        // fallback
      }
    }
    return this.packages.find(p => p._id === id);
  }

  async addPackage(pkg: Omit<TourPackage, '_id'>) {
    if (this.isMongoActive()) {
      try {
        const newDoc = await Package.create(pkg);
        const created: TourPackage = {
          ...pkg,
          _id: String(newDoc._id)
        };
        this.packages.unshift(created);
        return created;
      } catch (err) {
        console.warn('Mongo addPackage fallback:', err);
      }
    }

    const newPkg: TourPackage = {
      ...pkg,
      _id: `pkg-${Date.now()}`
    };
    this.packages.unshift(newPkg);
    return newPkg;
  }

  async updatePackage(id: string, updates: Partial<TourPackage>) {
    if (this.isMongoActive()) {
      try {
        await Package.findByIdAndUpdate(id, updates);
      } catch {
        // fallback
      }
    }
    const idx = this.packages.findIndex(p => p._id === id);
    if (idx === -1) return null;
    this.packages[idx] = { ...this.packages[idx], ...updates };
    return this.packages[idx];
  }

  async deletePackage(id: string) {
    if (this.isMongoActive()) {
      try {
        await Package.findByIdAndDelete(id);
      } catch {
        // fallback
      }
    }
    const prev = this.packages.length;
    this.packages = this.packages.filter(p => p._id !== id);
    return this.packages.length < prev;
  }

  // Bookings management
  async getAllBookings() {
    if (this.isMongoActive()) {
      try {
        const docs = await Booking.find().sort({ createdAt: -1 });
        if (docs && docs.length > 0) {
          return docs.map(b => ({
            _id: String(b._id),
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
            createdAt: b.createdAt.toISOString().split('T')[0]
          }));
        }
      } catch (err) {
        console.warn('Mongo getAllBookings fallback:', err);
      }
    }
    return this.bookings;
  }

  async getBookingsByUserId(userId: string) {
    if (this.isMongoActive()) {
      try {
        const docs = await Booking.find({ userId }).sort({ createdAt: -1 });
        if (docs && docs.length > 0) {
          return docs.map(b => ({
            _id: String(b._id),
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
            createdAt: b.createdAt.toISOString().split('T')[0]
          }));
        }
      } catch {
        // fallback
      }
    }
    return this.bookings.filter(b => b.userId === userId);
  }

  async createBooking(bookingData: Omit<BookingItem, '_id' | 'createdAt'>) {
    if (this.isMongoActive()) {
      try {
        const doc = await Booking.create(bookingData);
        const created: BookingItem = {
          ...bookingData,
          _id: String(doc._id),
          createdAt: doc.createdAt.toISOString().split('T')[0]
        };
        this.bookings.unshift(created);
        return created;
      } catch (err) {
        console.warn('Mongo createBooking fallback:', err);
      }
    }

    const newBooking: BookingItem = {
      ...bookingData,
      _id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  async updateBookingStatus(id: string, status: 'confirmed' | 'pending' | 'cancelled') {
    if (this.isMongoActive()) {
      try {
        await Booking.findByIdAndUpdate(id, { status });
      } catch {
        // fallback
      }
    }
    const booking = this.bookings.find(b => b._id === id);
    if (!booking) return null;
    booking.status = status;
    return booking;
  }

  async deleteBooking(id: string) {
    if (this.isMongoActive()) {
      try {
        await Booking.findByIdAndDelete(id);
      } catch {
        // fallback
      }
    }
    const prev = this.bookings.length;
    this.bookings = this.bookings.filter(b => b._id !== id);
    return this.bookings.length < prev;
  }

  // Reviews
  async getReviews(packageId?: string) {
    if (this.isMongoActive()) {
      try {
        const query = packageId ? { packageId } : {};
        const docs = await ReviewModel.find(query);
        if (docs && docs.length > 0) {
          return docs.map(r => ({
            id: r.id,
            packageId: r.packageId,
            userName: r.userName,
            userAvatar: r.userAvatar,
            location: r.location,
            rating: r.rating,
            date: r.date,
            title: r.title,
            comment: r.comment,
            helpful: r.helpful
          }));
        }
      } catch {
        // fallback
      }
    }

    if (packageId) {
      return this.reviews.filter(r => r.packageId === packageId);
    }
    return this.reviews;
  }

  async addReview(review: Omit<ReviewItem, 'id' | 'date' | 'helpful'>) {
    const id = `rev-${Date.now()}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const fullReview: ReviewItem = {
      ...review,
      id,
      date,
      helpful: 0
    };

    if (this.isMongoActive()) {
      try {
        await ReviewModel.create(fullReview);
      } catch {
        // fallback
      }
    }

    this.reviews.unshift(fullReview);
    return fullReview;
  }

  async likeReview(id: string) {
    if (this.isMongoActive()) {
      try {
        await ReviewModel.findOneAndUpdate({ id }, { $inc: { helpful: 1 } });
      } catch {
        // fallback
      }
    }
    const rev = this.reviews.find(r => r.id === id);
    if (rev) {
      rev.helpful += 1;
      return rev;
    }
    return null;
  }

  // Inquiries
  async createInquiry(inquiry: Omit<InquiryItem, 'id' | 'status' | 'createdAt'>) {
    const newInq: InquiryItem = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (this.isMongoActive()) {
      try {
        await InquiryModel.create(newInq);
      } catch {
        // fallback
      }
    }

    this.inquiries.unshift(newInq);
    return newInq;
  }
}

export const dbStore = new ResilientStore();
