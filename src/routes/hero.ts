import { Router, Request, Response } from "express";
import Hero from "../models/Hero";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const hero = await Hero.findOne().sort({ createdAt: -1 });
  if (!hero) {
    res.status(404).json({ message: "Hero content not found" });
    return;
  }
  res.json(hero);
});

router.post("/", protect, async (req: Request, res: Response): Promise<void> => {
  const created = await Hero.create(req.body);
  res.status(201).json(created);
});

router.put("/", protect, async (req: Request, res: Response): Promise<void> => {
  const hero = await Hero.findOne().sort({ createdAt: -1 });

  if (hero) {
    Object.assign(hero, req.body);
    await hero.save();
    res.json(hero);
  } else {
    const created = await Hero.create(req.body);
    res.status(201).json(created);
  }
});

export default router;
