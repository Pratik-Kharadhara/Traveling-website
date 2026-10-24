import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
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
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  _id: { type: String },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  type: { type: String, enum: ['package', 'hotel', 'flight'], required: true },
  itemTitle: { type: String, required: true },
  details: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  guests: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
