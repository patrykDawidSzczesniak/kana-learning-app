
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../db";
import { RegisterRequest, LoginRequest, AuthRequest } from "../types/Requests";
import User, { UserHighScore } from "../types/User";
import {
  LoginResponse,
  RegisterResponse,
  ErrorResponse,
  ProfileResponse,
} from "../types/Responses";
import { generateToken } from "../utils/jwt";

export const registerUser = async (
  req: RegisterRequest,
  res: Response<RegisterResponse | ErrorResponse>
) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ error: "Not enough data provided" });
  }

  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as User | undefined;

  if (user) {
    return res.status(409).json({ error: "Email address is already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const insertUser = db.prepare(
    "INSERT INTO users (name, password, email) VALUES (?, ?, ?)"
  );
  const userResult = insertUser.run(name, hashedPassword, email);
  const userId = userResult.lastInsertRowid as number;

  const insertLevel = db.prepare(
    "INSERT INTO levels (user_id, level_available, alphabet) VALUES (?, ?, ?)"
  );
  insertLevel.run(userId, 1, "hiragana");
  insertLevel.run(userId, 1, "katakana");

  res.status(201).json({ message: "Registration successful" });
};

export const loginUser = async (
  req: LoginRequest,
  res: Response<LoginResponse | ErrorResponse>
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Not enough data provided" });
  }

  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as User | undefined;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  const token = generateToken(user.id, user.name);

  res.status(200).json({
    message: "Logged in successfully",
    userId: user.id,
    name: user.name,
    token,
  });
};

export const getUserProfile = async (
  req: AuthRequest,
  res: Response<ProfileResponse | ErrorResponse>
) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = db
    .prepare("SELECT id, name, email FROM users WHERE id = ?")
    .get(userId) as User | undefined;

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const highscores = db
    .prepare(
      "SELECT level, alphabet, score, time_seconds FROM user_highest_scores WHERE user_id = ? ORDER BY alphabet, level"
    )
    .all(userId) as UserHighScore[];

  const levelsRaw = db
    .prepare("SELECT level_available, alphabet FROM levels WHERE user_id = ?")
    .all(userId) as { level_available: number; alphabet: "hiragana" | "katakana" }[];

  const levels = {
    hiragana: [] as number[],
    katakana: [] as number[],
  };

  for (const l of levelsRaw) {
    levels[l.alphabet].push(l.level_available);
  }

  res.status(200).json({
    ...user,
    highscores,
    levels,
  });
};
