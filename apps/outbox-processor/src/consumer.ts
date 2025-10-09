import { TOPIC_NAME } from "./index";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["192.168.0.67:9092"], // host IP
});

export default async function consumer() {
  console.log("Control is inside the consumer function");

  const consumer = kafka.consumer({ groupId: "execution-group" });
  await consumer.connect();
  await consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      // Parse JSON if your messages are JSON
      try {
        const workflow = JSON.parse(message.value.toString());
        console.log("Workflow received from Kafka:", workflow);
      } catch (err) {
        // If not JSON, just print raw value
        console.log(
          "Workflow received from Kafka (raw):",
          message.value.toString(),
        );
      }
    },
  });
}

// console.log("control is inside the consumer file");

// export default function consumer() {
//   console.log("control is inside the consume file");
// }
