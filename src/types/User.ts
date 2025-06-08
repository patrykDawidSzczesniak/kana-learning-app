interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserHighScore {
  user_id: number;
  level: number;
  alphabet: "hiragana" | "katakana";
  score: number;
  time_seconds: number;
}

export default User;