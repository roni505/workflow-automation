import { Router } from "express";
import { prisma } from "@repo/db";
import authMiddleware from "../middlewares/auth";

const router: Router = Router();

router.post("/credentials", authMiddleware, async (req, res) => {
  const body = req.body;
  const user_id = req.user_id;

  console.log(body);

  const addedCredentails = await prisma.credentials.create({
    data: {
      name: body.name,
      platform: body.platform,
      data: body.data,
      user: {
        connect: {
          id: user_id,
        },
      },
    },
  });

  res.json({
    message: "Credentails created and added",
    addedCredentails,
  });
});

export default router;
