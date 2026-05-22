import { Router, Request, Response } from "express";
import Release from "../models/Release";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// GET /api/releases          → all releases
// GET /api/releases?featured=true  → featured only
// GET /api/releases?featured=false → shelf row
function normalize(r: Record<string, unknown>) {
  return {
    ...r,
    coverUrl:  r.coverUrl  || r.imageUrl  || "",
    listenUrl: r.listenUrl || r.musicLink || "",
  };
}

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const filter: Record<string, unknown> = {};
  if (req.query.featured !== undefined) {
    filter.featured = req.query.featured === "true";
  }
  const releases = await Release.find(filter).sort({ displayOrder: 1, createdAt: -1 }).lean();
  res.json(releases.map(normalize));
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const release = await Release.findById(req.params.id).lean();
  if (!release) {
    res.status(404).json({ message: "Release not found" });
    return;
  }
  res.json(normalize(release as Record<string, unknown>));
});

router.post("/", protect, async (req: Request, res: Response): Promise<void> => {
  const release = await Release.create(req.body);
  res.status(201).json(release);
});

router.put("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  const release = await Release.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!release) {
    res.status(404).json({ message: "Release not found" });
    return;
  }
  res.json(release);
});

router.delete("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  const release = await Release.findByIdAndDelete(req.params.id);
  if (!release) {
    res.status(404).json({ message: "Release not found" });
    return;
  }
  res.status(204).send();
});

export default router;
