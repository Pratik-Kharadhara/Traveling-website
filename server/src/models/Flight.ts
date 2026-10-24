import mongoose, { Schema, Document } from 'mongoose';

export interface IFlight extends Document {
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

const FlightSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  logo: { type: String, default: '' },
  from: { type: String, required: true },
  fromCode: { type: String, required: true },
  to: { type: String, required: true },
  toCode: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  stops: { type: String, default: 'Non-stop' },
  price: { type: Number, required: true },
  class: { type: String, enum: ['Economy', 'Business', 'First Class'], default: 'Economy' }
});

export default mongoose.models.Flight || mongoose.model<IFlight>('Flight', FlightSchema);
