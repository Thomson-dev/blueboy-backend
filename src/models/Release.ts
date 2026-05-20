import mongoose, { Document, Schema } from "mongoose";

export interface IRelease extends Document {
  title: string;
  eyebrow: string;
  featuredArtist: string | null;
  coverUrl: string;
  listenUrl: string;
  watchUrl: string | null;
  featured: boolean;
  displayOrder: number;
  type: "album" | "single" | "ep";
  artClass: string;
  buttons: string[];
}

const ReleaseSchema = new Schema<IRelease>(
  {
    title: { type: String, required: true, trim: true },
    eyebrow: { type: String, default: "" },
    featuredArtist: { type: String, default: null },
    coverUrl: { type: String, default: "" },
    listenUrl: { type: String, default: "" },
    watchUrl: { type: String, default: null },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    type: { type: String, enum: ["album", "single", "ep"], default: "single" },
    artClass: { type: String, default: "art-morayo" },
    buttons: { type: [String], default: ["LISTEN NOW"] },
  },
  { timestamps: true }
);

export default mongoose.model<IRelease>("Release", ReleaseSchema);
