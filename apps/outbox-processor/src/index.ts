import { Kafka } from "kafkajs";
import { prisma } from "@repo/db";
// import consumer from "./consumer";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"], // host IP
});

export const TOPIC_NAME = "workflow-execution";

// async function test() {
//   while (1) {
//     const workflow = await prisma.outbox_workflow.findMany({
//       where: {},
//       take: 10,
//     });

//     console.log("Workflow from the outbox table: ", workflow);
//   }
// }

// test();
// consumer();

async function ensureTopicExists() {
  const admin = kafka.admin();
  await admin.connect();

  const topics = await admin.listTopics();
  if (!topics.includes(TOPIC_NAME)) {
    console.log(`Topic "${TOPIC_NAME}" does not exist. Creating...`);
    await admin.createTopics({
      topics: [
        {
          topic: TOPIC_NAME,
          numPartitions: 3,
          replicationFactor: 1,
        },
      ],
    });
    console.log(`Topic "${TOPIC_NAME}" created.`);
  }

  await admin.disconnect();
}

async function main() {
  // Ensure topic exists before starting producer loop
  await ensureTopicExists();

  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    const workflow = await prisma.outbox_workflow.findMany({
      where: {},
      take: 10,
    });

    if (workflow.length === 0) {
      await new Promise((res) => setTimeout(res, 1000)); // wait 1s if no workflows
      continue;
    }

    // console.log(
    //   "This is the workflow from the outbox_workflow table:",
    //   workflow,
    // );

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

main().catch((err) => console.error(err));

// consumer();
