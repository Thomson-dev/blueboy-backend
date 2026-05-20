import { Router, Request, Response } from "express";
import TourDate from "../models/TourDate";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const dates = await TourDate.find({ date: { $gte: new Date() } }).sort({ date: 1 });
  res.json(dates);
});

router.post("/", protect, async (req: Request, res: Response): Promise<void> => {
  const tourDate = await TourDate.create(req.body);
  res.status(201).json(tourDate);
});

router.put("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  const tourDate = await TourDate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tourDate) {
    res.status(404).json({ message: "Tour date not found" });
    return;
  }
  res.json(tourDate);
});

router.delete("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  const tourDate = await TourDate.findByIdAndDelete(req.params.id);
  if (!tourDate) {
    res.status(404).json({ message: "Tour date not found" });
    return;
  }
  res.status(204).send();
});

export default router;
