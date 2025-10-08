import { Router } from "express";
import { prisma } from "@repo/db";

const router: Router = Router();

router.post("/workflow", async (req, res) => {
  const body = req.body;
  const user_id = req.user_id;
  console.log(body);

  if (!body) {
    return res.send("Body is empty from backend");
  }
  try {
    // adding data, send from frontend to the database
    // we are using outbox architecture pattern here
    // uisng this pattern ensures atomicity (making sure that all actions happens or nothing happens)
    const adding = await prisma.$transaction(async (tx) => {
      const workflow = await tx.workflow.create({
        data: {
          isActive: body.isActive,
          name: body.name,
          isArchived: body.isArchived,
          nodes: body.iNodes,
          connections: body.iEdges,
          user: {
            connect: {
              id: "347245f7-fd38-442f-b155-ad0f202d8575",
            },
          },
        },
      });
      const outbox_workflow = prisma.outbox_workflow.create({
        data: {
          isActive: body.isActive,
          name: body.name,
          isArchived: body.isArchived,
          nodes: body.iNodes,
          connections: body.iEdges,
          user: {
            connect: {
              id: "347245f7-fd38-442f-b155-ad0f202d8575",
            },
          },
        },
      });
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
