export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'traveler';
  avatar: string;
}

export interface TourPackage {
  _id: string;
  title: string;
  destination: string;
  country: string;
  tagline: string;
  image: string;
  gallery: string[];
  price: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviewsCount: number;
  category: 'Luxury' | 'Romantic' | 'Nature' | 'Cultural' | 'Adventure';
  highlights: string[];
  itinerary: { day: number; title: string; desc: string; meals: string }[];
  included: string[];
  excluded: string[];
  featured?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  stars: number;
  amenities: string[];
  roomTypes: { type: string; price: number; capacity: number; size: string }[];
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  logo: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  class: 'Economy' | 'Business' | 'First Class';
}

export interface Booking {
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

export interface ReviewItem {
  id: string;
  packageId?: string;
  userName: string;
  userAvatar: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
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

export interface ItineraryDayPlan {
  id: string;
  dayNumber: number;
  title: string;
  activity: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  location: string;
  estimatedCost: number;
  notes: string;
}
