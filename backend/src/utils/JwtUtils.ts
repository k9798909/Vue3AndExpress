import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const getJwtToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });
};

export const verify = (jwtToken: string): boolean => {
  try {
    jwt.verify(jwtToken, JWT_SECRET_KEY!);
    return true;
  } catch (error) {
    return false;
  }
};
