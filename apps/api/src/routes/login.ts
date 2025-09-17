import { prisma } from "@repo/db";
import { LoginSchema } from "@repo/types/validation";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./signup";

const router: Router = Router();

router.post("/login", async (req, res) => {
  const body = LoginSchema.safeParse(req.body);
  try {
    if (!body.success) {
      return res.json({
        message: "Validation failed! Please check your input",
      });
    }
    // checking user in the database
    const user = await prisma.user.findUnique({
      where: {
        email: body.data.email,
        password: body.data.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!user) {
      return res.json({
        message: "User not found, please create account first",
      });
    }
    // sending jwt token
    const token = jwt.sign(
      {
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
      },
      JWT_SECRET
    );
    res.json({
      message: "Welcome, please start automating your workflow",
      jwt: token,
    });
  } catch (error) {
    console.error("Error from login route: ", error);
  }
});

export default router;
