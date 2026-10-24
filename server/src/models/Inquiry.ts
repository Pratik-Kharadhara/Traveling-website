import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
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

const InquirySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  destination: { type: String, default: '' },
  travelDate: { type: String, default: '' },
  guests: { type: Number, default: 2 },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'responded'], default: 'new' },
  createdAt: { type: String, required: true }
});

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
