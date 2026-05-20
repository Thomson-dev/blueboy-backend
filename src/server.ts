import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import heroRoutes from "./routes/hero";
import releasesRoutes from "./routes/releases";
import videosRoutes from "./routes/videos";
import tourDatesRoutes from "./routes/tourDates";
import authRoutes from "./routes/auth";
import uploadsRoutes from "./routes/uploads";

dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI ?? "";

app.use(cors());
app.use(express.json());

app.use("/api/hero", heroRoutes);
app.use("/api/releases", releasesRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/tour-dates", tourDatesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadsRoutes);

let dbConnected = false;

async function connectDB() {
  if (dbConnected || mongoose.connection.readyState === 1) {
    dbConnected = true;
    return;
  }
  await mongoose.connect(MONGODB_URI);
  dbConnected = true;
}

// Ensure DB is connected before every request (cached after first call)
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Local dev: start the HTTP server directly
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT ?? 5000;
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => { console.error("MongoDB connection error:", err); process.exit(1); });
}

export default app;
