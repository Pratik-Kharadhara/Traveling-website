import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
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

const ReviewSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  packageId: { type: String },
  userName: { type: String, required: true },
  userAvatar: { type: String, default: '' },
  location: { type: String, default: 'Global Traveler' },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  helpful: { type: Number, default: 0 }
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
