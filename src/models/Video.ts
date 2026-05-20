import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  title: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  displayOrder: number;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IVideo>("Video", VideoSchema);
