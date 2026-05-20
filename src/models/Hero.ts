import mongoose, { Document, Schema } from "mongoose";

export interface IHero extends Document {
  label: string;
  albumTitle: string;
  ctaText: string;
  ctaUrl: string;
}

const HeroSchema = new Schema<IHero>(
  {
    label: { type: String, required: true },
    albumTitle: { type: String, required: true },
    ctaText: { type: String, required: true },
    ctaUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IHero>("Hero", HeroSchema);
