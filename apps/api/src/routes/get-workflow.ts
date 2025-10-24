import { prisma } from "@repo/db";
import { Router } from "express";
import authMiddleware from "../middlewares/auth";

const router: Router = Router();

router.get("/get-workflow", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user_id;
    const data = await prisma.workflow.findMany({
      where: {
        id: user_id,
      },
    });
    res.json({
      message: "All workflow sent",
      data: data,
    });
  } catch (error) {
    console.error("Error getting all the workflow data ");
  }
});

export default router;
