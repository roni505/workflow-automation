import { prisma } from "@repo/db";
import { Router } from "express";

const router = Router();

router.get("/get-credentials", async (req, res) => {
  const user_id = req.user_id;

  const credentailData = await prisma.credentials.findMany({
    where: {
      user_Id: "347245f7-fd38-442f-b155-ad0f202d8575",
    },
  });
  res.json({
    message: "Credentials sent",
    credentailData,
  });
});
