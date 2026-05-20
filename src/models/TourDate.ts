import mongoose, { Document, Schema } from "mongoose";

export interface ITourDate extends Document {
  date: Date;
  city: string;
  venue: string;
  ticketUrl: string;
  soldOut: boolean;
}

const TourDateSchema = new Schema<ITourDate>(
  {
    date: { type: Date, required: true },
    city: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    ticketUrl: { type: String, required: true },
    soldOut: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITourDate>("TourDate", TourDateSchema);
