import { prisma } from "@repo/db";
import { Router } from "express";
import authMiddleware from "../middlewares/auth";

const router: Router = Router();

router.delete("/workflow/delete", authMiddleware, async (req, res) => {
  console.log("Control is inside the delete route");

  const { id } = req.body;
  const user_id = req.user_id;

  if (!id) {
    return res.status(400).json({ error: "Workflow ID is required" });
  }

  try {
    const workflow = await prisma.workflow.findUnique({ where: { id } });

    if (!workflow) {
      return res.status(404).json({ error: "Workflow not found" });
    }

    const deletedWorkflow = await prisma.workflow.delete({ where: { id } });

    res.json({
      message: "Workflow deleted successfully",
      data: deletedWorkflow,
    });
  } catch (error) {
    console.error("Error deleting workflow:", error);
    res.status(500).json({ error: "Failed to delete workflow" });
  }
});

export default router;
