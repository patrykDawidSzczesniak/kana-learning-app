import { Request } from 'express';

export interface RegisterRequest extends Request {
  body: {
    name: string;
    password: string;
    email: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    name: string;
  };
}

export interface QuizRequest extends Request {
  params: {
    alphabet: "hiragana" | "katakana";
    level: string;
  };
}

export interface SubmitQuizRequest extends Request {
  body: {
    userId: number;
    level: number;
    alphabet: "hiragana" | "katakana";
    score: number;
    time_seconds: number;
  };
}