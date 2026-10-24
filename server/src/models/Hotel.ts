import mongoose, { Schema, Document } from 'mongoose';

export interface IHotel extends Document {
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

const HotelSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  pricePerNight: { type: Number, required: true },
  stars: { type: Number, default: 5 },
  amenities: [{ type: String }],
  roomTypes: [{
    type: { type: String },
    price: { type: Number },
    capacity: { type: Number },
    size: { type: String }
  }]
});

export default mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema);
