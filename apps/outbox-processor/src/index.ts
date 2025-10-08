import { Kafka } from "kafkajs";
import { prisma } from "@repo/db";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "workflow-topic";

async function main() {
  while (1) {
    const producer = kafka.producer();
    await producer.connect();

    const workflow = await prisma.outbox_workflow.findMany({
      where: {},
      take: 10,
    });

    await producer.send({
      topic: TOPIC_NAME,
      messages: workflow.map((node) => ({
        value: JSON.stringify(node),
      })),
    });

    await prisma.outbox_workflow.deleteMany({
      where: {
        id: {
          in: workflow.map((x) => x.id),
        },
      },
    });
  }
}

main();
