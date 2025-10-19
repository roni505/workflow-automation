import { prisma } from "@repo/db";
import { Router } from "express";

const router: Router = Router();

router.delete("/worflow/delete", async (req, res) => {
  console.log("Control is inside the delete route");

  const body = req.body;
  console.log(body);

  const deletedWorflow = await prisma.workflow.delete({
    where: {
      id: body.id,
      user_Id: "347245f7-fd38-442f-b155-ad0f202d8575",
    },
  });
  res.json({
    message: "Worflow deleted sucessfully",
    data: deletedWorflow,
  });
});

export default router;
