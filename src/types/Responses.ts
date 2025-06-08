import User, { UserHighScore } from "./User";

export interface LoginResponse {
  message: string;
  userId: number;
  name: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export interface QuizSignResponse {
  id: number;
  sign: string;
  pronunciation: string;
}

export interface SubmitQuizResponse {
  message: string;
  newHighScore: boolean;
  unlockedNextLevel?: boolean;
}

type UserHighScoreWithoutId = Omit<UserHighScore, "user_id">

export interface ProfileResponse extends User {
  highscores: UserHighScoreWithoutId[];
  levels: {
    hiragana: number[];
    katakana: number[];
  };
}
