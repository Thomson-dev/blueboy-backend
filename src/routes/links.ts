import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    res.status(400).json({ message: "url query param is required" });
    return;
  }

  const apiUrl = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(url)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  res.status(response.status).json(data);
});

export default router;
