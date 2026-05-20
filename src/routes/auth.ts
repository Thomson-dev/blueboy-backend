import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser";

const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body as { username: string; password: string };

  if (!username || !password) {
    res.status(400).json({ message: "Username and password required" });
    return;
  }

  const admin = await AdminUser.findOne({ username });
  if (!admin || !(await admin.comparePassword(password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as jwt.SignOptions["expiresIn"] }
  );

  res.json({ token });
});

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { username, password, secret } = req.body as {
    username: string;
    password: string;
    secret: string;
  };

  if (secret !== process.env.JWT_SECRET) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const existing = await AdminUser.findOne({ username });
  if (existing) {
    res.status(409).json({ message: "Username already exists" });
    return;
  }

  const admin = await AdminUser.create({ username, password });
  res.status(201).json({ id: admin._id, username: admin.username });
});

export default router;
