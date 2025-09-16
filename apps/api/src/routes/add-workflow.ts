import { Request, Router } from "express";
import { WorkFlow } from "@repo/types/workflow";
import { prisma } from "@repo/db";

const router: Router = Router();

router.post("/workflow", async (req, res) => {
  const body = req.body;
  try {
    // adding data send from frontend to the database
    const workflow = await prisma.workflow.create({
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: body.isActive,
        name: body.name,
        isArchived: body.isArchived,
        nodes: body.nodes,
        connections: body.connection,
        user: {
          connect: {
            id: "123",
          },
        },
      },
    });
    res.json({
      message: "Workflow has been added",
    });
  } catch (error) {
    console.error("This is the error:", error);
  }
});
export default router;
