import { Router } from "express";
import { prisma } from "@repo/db";

const router: Router = Router();

router.post("/credentials", async (req, res) => {
  const body = req.body;
  const user_id = req.user_id;

  console.log(body);

  await prisma.credentials.create({
    data: {
      name: body.name,
      platform: body.platform,
      data: body.data,
      user: {
        connect: {
          id: "347245f7-fd38-442f-b155-ad0f202d8575",
        },
      },
    },
  });

  res.json({
    message: "Credentails created and added",
  });
});

export default router;
