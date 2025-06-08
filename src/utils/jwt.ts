import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined in .env");
}

export const generateToken = (userId: number, name: string): string => {
  const payload = { userId, name };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRATION as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
