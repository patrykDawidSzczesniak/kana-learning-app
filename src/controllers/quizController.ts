import { Request, Response } from "express";
import db from "../db";
import { QuizSignResponse, ErrorResponse, SubmitQuizResponse } from "../types/Responses";
import { SubmitQuizRequest } from "../types/Requests";
import { UserHighScore } from "../types/User";

const isValidAlphabet = (alphabet: string) => ["hiragana", "katakana"].includes(alphabet);

export const getQuiz = async (
  req: Request<{ alphabet: string; level: string }, QuizSignResponse[] | ErrorResponse>,
  res: Response<QuizSignResponse[] | ErrorResponse>
) => {
  const { alphabet, level } = req.params;

  if (!isValidAlphabet(alphabet)) {
    return res.status(400).json({ error: "Invalid alphabet type" });
  }

  const levelNumber = Number(level);
  if (isNaN(levelNumber) || levelNumber < 1) {
    return res.status(400).json({ error: "Invalid level number" });
  }

  const stmt = db.prepare(
    "SELECT id, sign, pronunciation FROM " + alphabet + " WHERE group_id = ?"
  );
  const results = stmt.all(levelNumber) as QuizSignResponse[];

  res.status(200).json(results);
};

export const submitQuiz = async (
  req: SubmitQuizRequest,
  res: Response<SubmitQuizResponse | ErrorResponse>
) => {
  const { userId, level, alphabet, score, time_seconds } = req.body;

  if (
    userId === undefined || level === undefined || alphabet === undefined ||
    score === undefined || time_seconds === undefined
  ) {
    return res.status(400).json({ error: "Incomplete quiz data" });
  }

  const insertScore = db.prepare(
    "INSERT INTO scores (user_id, level, alphabet, score, time_seconds) VALUES (?, ?, ?, ?, ?)"
  );
  insertScore.run(userId, level, alphabet, score, time_seconds);

  const getHighScore = db.prepare(
    "SELECT * FROM user_highest_scores WHERE user_id = ? AND level = ? AND alphabet = ?"
  ).get(userId, level, alphabet) as UserHighScore | undefined;

  let newHighScore = false;

  if (!getHighScore || score > getHighScore.score) {
    const upsert = getHighScore
      ? db.prepare("UPDATE user_highest_scores SET score = ?, time_seconds = ? WHERE user_id = ? AND level = ? AND alphabet = ?")
      : db.prepare("INSERT INTO user_highest_scores (user_id, level, alphabet, score, time_seconds) VALUES (?, ?, ?, ?, ?)");

    getHighScore
      ? upsert.run(score, time_seconds, userId, level, alphabet)
      : upsert.run(userId, level, alphabet, score, time_seconds);

    newHighScore = true;
  }

  let unlockedNextLevel = false;

  if (level !== 16 && score >= 90) {
    const nextLevel = Number(level) + 1;
    const alreadyUnlocked = db.prepare(
      "SELECT * FROM levels WHERE user_id = ? AND level_available = ? AND alphabet = ?"
    ).get(userId, nextLevel, alphabet);

    if (!alreadyUnlocked) {
      const insertLevel = db.prepare(
        "INSERT INTO levels (user_id, level_available, alphabet) VALUES (?, ?, ?)"
      );
      insertLevel.run(userId, nextLevel, alphabet);
      unlockedNextLevel = true;
    }
  }

  res.status(200).json({
    message: "Quiz result submitted",
    newHighScore,
    unlockedNextLevel,
  });
};

export const getFreeplayQuiz = async (
  req: Request<{}, QuizSignResponse[] | ErrorResponse, { alphabet: string; levels: number[] }>,
  res: Response<QuizSignResponse[] | ErrorResponse>
) => {
  const { alphabet, levels } = req.body;

  if (!isValidAlphabet(alphabet)) {
    return res.status(400).json({ error: "Invalid alphabet type" });
  }

  if (!Array.isArray(levels) || levels.some(l => typeof l !== "number" || l < 1)) {
    return res.status(400).json({ error: "Invalid levels array" });
  }

  const placeholders = levels.map(() => "?").join(", ");
  const query = `SELECT id, sign, pronunciation FROM ${alphabet} WHERE group_id IN (${placeholders})`;
  const stmt = db.prepare(query);

  const results = stmt.all(...levels) as QuizSignResponse[];

  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [results[i], results[j]] = [results[j], results[i]];
  }

  res.status(200).json(results);
};
