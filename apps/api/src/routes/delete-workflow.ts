import { prisma } from "@repo/db";
import { Router } from "express";
import authMiddleware from "../middlewares/auth";

const router: Router = Router();

router.delete("/worflow/delete", authMiddleware, async (req, res) => {
  console.log("Control is inside the delete route");

  const body = req.body;
  console.log(body);

  const user_id = req.user_id;

  const deletedWorflow = await prisma.workflow.delete({
    where: {
      id: body.id,
      user_Id: user_id,
    },
  });
  res.json({
    message: "Worflow deleted sucessfully",
    data: deletedWorflow,
  });
});

export default router;
