import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const authentification = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Unauthorized: No authorization header" });
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Invalid token format" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as jwt.JwtPayload;
    req["currentUser"] = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
