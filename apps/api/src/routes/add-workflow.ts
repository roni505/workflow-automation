import { Router } from "express";
import { prisma } from "@repo/db";

const router: Router = Router();

router.post("/workflow", async (req, res) => {
  const body = req.body;
  try {
    // adding data send from frontend to the database
    const adding = await prisma.workflow.create({
      data: {
        isActive: body.active,
        name: body.name,
        isArchived: body.isArchived,
        nodes: {},
        connections: {},
        user: {
          connect: {
            id: "123",
          },
        },
      },
    });
    console.log("Control is here ", adding);

    res.json({
      message: "Workflow has been added",
    });
  } catch (error) {
    console.error("This is the error:", error);
  }
});
export default router;
