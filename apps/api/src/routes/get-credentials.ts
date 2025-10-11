import { prisma } from "@repo/db";
import { Router } from "express";

const router: Router = Router();

router.get("/get-credentials", async (req, res) => {
  const user_id = req.user_id;

  const credentailData = await prisma.credentials.findMany({
    where: {},
  });

  res.json({
    message: "Credentials sent",
    credentailData,
  });
});

export default router;
