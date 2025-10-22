import { prisma } from "@repo/db";
import { Router } from "express";
import { workflowProducer } from "../services/workflow-producer";

const router: Router = Router();

router.post("/webhook/:webhookId", async (req, res) => {
  try {
    const { webhookId } = req.params;

    const WEBHOOK_URL = `http://localhost:8080/api/v0/webhook/${webhookId}`;

    //find the webhook in db
    const webhook = await prisma.webhook.findUnique({
      where: {
        URL: WEBHOOK_URL,
      },
    });

    console.log("This is the webhook from res: ", webhook);

    if (!webhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }

    const workflow = await prisma.workflow.findFirst({
      where: {
        webhook_Id: webhook.id,
      },
    });

    if (!workflow) {
      return res.status(404).json({ error: "Workflow not found" });
    }

    const producer = await workflowProducer(workflow);
    console.log("Worflow from db: ", workflow);

    res.json({
      message: "Webhook URL has been hit",
      // data: producer,
    });
  } catch (error) {
    console.error("Error while execution webhook: ", error);
  }
});

export default router;
