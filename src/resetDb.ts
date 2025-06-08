import Database from "better-sqlite3";
import fs from "fs";
import hiraganaData from "./data/hiragana";
import katakanaData from "./data/katakana";
import bcrypt from "bcrypt";

const db = new Database("database.sqlite");
db.exec("PRAGMA foreign_keys = ON;");

function runMigrations() {
  const migration = fs.readFileSync("./migrations/initial.sql", "utf-8");
  db.exec(migration);
  console.log("Database migrated successfully");
}

runMigrations();

const users = [
  { name: "user1", password: "password1!", email: "user1@example.com" },
  { name: "user2", password: "password2!", email: "user2@example.com" },
  { name: "user3", password: "password3!", email: "user3@example.com" },
];

const levels = [
  { user_id: 1, level_available: 1, alphabet: "hiragana" },
  { user_id: 1, level_available: 1, alphabet: "katakana" },
  { user_id: 2, level_available: 1, alphabet: "hiragana" },
  { user_id: 2, level_available: 1, alphabet: "katakana" },
  { user_id: 3, level_available: 1, alphabet: "hiragana" },
  { user_id: 3, level_available: 1, alphabet: "katakana" },
];

function resetDatabase() {
  db.exec("DELETE FROM levels");
  db.exec("DELETE FROM users");
  db.exec("DELETE FROM hiragana");
  db.exec("DELETE FROM katakana");

  const insertUser = db.prepare(
    "INSERT INTO users (name, password, email) VALUES (?, ?, ?)"
  );
  users.forEach((user) => {
    const hashed = bcrypt.hashSync(user.password, 10);
    insertUser.run(user.name, hashed, user.email);
  });

  const insertHiragana = db.prepare(
    "INSERT INTO hiragana (group_id, sign, pronunciation) VALUES (?, ?, ?)"
  );
  hiraganaData.forEach((item) => {
    insertHiragana.run(item.group_id, item.sign, item.pronunciation);
  });

  const insertKatakana = db.prepare(
    "INSERT INTO katakana (group_id, sign, pronunciation) VALUES (?, ?, ?)"
  );
  katakanaData.forEach((item) => {
    insertKatakana.run(item.group_id, item.sign, item.pronunciation);
  });

  const insertLevel = db.prepare(
    "INSERT INTO levels (user_id, level_available, alphabet) VALUES (?, ?, ?)"
  );
  levels.forEach((level) => {
    insertLevel.run(level.user_id, level.level_available, level.alphabet);
  });

  console.log("Database has been reset");
}

resetDatabase();
db.close();
