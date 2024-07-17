import { Request, Response, NextFunction } from "express";
import * as JwtUtils from "../utils/JwtUtils";

export async function errorHandling(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
}

export async function authorizeFilter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.path === "/api/auth/login") {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  if (!JwtUtils.verify(token)) {
    return res.sendStatus(401);
  }

  next();
}
