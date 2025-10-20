import { Kafka } from "kafkajs";
import { prisma } from "@repo/db";
// import consumer from "./consumer";
import { WorkFlow } from "@repo/types/workflow";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"], // host IP
});

export const TOPIC_NAME = "workflow-execution";

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

export async function workflowProducer(workflow: any) {
  // Ensure topic exists before starting producer loop
  await ensureTopicExists();

  const producer = kafka.producer();
  await producer.connect();

  console.log("This is pushed to kafka", workflow);

  await producer.send({
    topic: TOPIC_NAME,
    messages: [{ value: JSON.stringify(workflow) }],
  });
}
