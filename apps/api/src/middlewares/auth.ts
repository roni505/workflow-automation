import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "THIS_IS_THE_TOKEN";

declare global {
  namespace Express {
    interface Request {
      user_id: string;
      user_name: string;
      user_email: string;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "header is empty",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({
      message: "No token present",
    });
  }
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  const { user_id, user_name, user_email } = decoded;

  req.user_id = user_id;
  req.user_name = user_name;
  req.user_email = user_email;

  next();
};

export default authMiddleware;
