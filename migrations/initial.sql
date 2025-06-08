DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS user_highest_scores;
DROP TABLE IF EXISTS hiragana;
DROP TABLE IF EXISTS katakana;
DROP TABLE IF EXISTS levels;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE hiragana (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  sign TEXT NOT NULL CHECK (length(sign) <= 1),
  pronunciation TEXT NOT NULL CHECK (length(pronunciation) <= 3)
);

CREATE TABLE katakana (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  sign TEXT NOT NULL CHECK (length(sign) <= 1),
  pronunciation TEXT NOT NULL CHECK (length(pronunciation) <= 3)
);

CREATE TABLE levels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  level_available INTEGER NOT NULL,
  alphabet TEXT NOT NULL CHECK (alphabet IN ('hiragana', 'katakana')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  level INTEGER NOT NULL,
  alphabet TEXT NOT NULL CHECK (alphabet IN ('hiragana', 'katakana')),
  score INTEGER NOT NULL,
  time_seconds INTEGER NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_highest_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  level INTEGER NOT NULL,
  alphabet TEXT NOT NULL CHECK (alphabet IN ('hiragana', 'katakana')),
  score INTEGER NOT NULL,
  time_seconds INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);