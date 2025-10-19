import { prisma } from "@repo/db";
import { Router } from "express";
import { workflowProducer } from "../services/workflow-producer";

const router: Router = Router();

router.post("/workflow/:id", async (req, res) => {
  console.log("Control is inside workflow/:id");

  const body = req.params;
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: body.id,
    },
  });
  console.log("Res from db: ", workflow);

  const producerResult = await workflowProducer(workflow);
  res.json({
    message: "Execution has started",
    workflow,
  });
});

export default router;
