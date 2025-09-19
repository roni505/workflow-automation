import { Router } from "express";
import { SignUpSchema } from "@repo/types/validation";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db";
import { SignUpType } from "@repo/types/validation";

export const JWT_SECRET = "This_is_the_secret";

const router: Router = Router();

router.post("/auth/signup", async (req, res) => {
  const body = SignUpSchema.safeParse(req.body);
  try {
    if (!body.success) {
      return res.json({
        message: "Validation failed! Please check your inputs",
      });
    }
    const { name, email, password } = body.data;

    //   adding data in database
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    const token = jwt.sign(
      {
        user_email: user.email,
        user_name: user.name,
        user_id: user.id,
      },
      JWT_SECRET,
    );

    res.json({
      message: "User created",
      jwt: token,
    });
  } catch (error) {
    console.error("This is the error from signup route");
  }
});

export default router;
