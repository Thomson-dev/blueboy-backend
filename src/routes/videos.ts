import { Router, Request, Response } from "express";
import Video from "../models/Video";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const videos = await Video.find().sort({ displayOrder: 1, createdAt: -1 });
  res.json(videos);
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(404).json({ message: "Video not found" });
    return;
  }
  res.json(video);
});

router.post("/", protect, async (req: Request, res: Response): Promise<void> => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
});

router.put("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!video) {
    res.status(404).json({ message: "Video not found" });
    return;
  }
  res.json(video);
});

router.delete("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    res.status(404).json({ message: "Video not found" });
    return;
  }
  res.status(204).send();
});

export default router;
