import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
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
  featured: boolean;
}

const PackageSchema: Schema = new Schema({
  _id: { type: String },
  title: { type: String, required: true },
  destination: { type: String, required: true },
  country: { type: String, required: true },
  tagline: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  groupSize: { type: String, default: 'Max 8 Guests' },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  category: { type: String, enum: ['Luxury', 'Romantic', 'Nature', 'Cultural', 'Adventure'], default: 'Luxury' },
  highlights: [{ type: String }],
  itinerary: [{
    day: Number,
    title: String,
    desc: String,
    meals: String
  }],
  included: [{ type: String }],
  excluded: [{ type: String }],
  featured: { type: Boolean, default: false }
});

export default mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);
