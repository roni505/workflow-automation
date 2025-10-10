// import { TOPIC_NAME } from "./index";
// import { Kafka } from "kafkajs";

// const kafka = new Kafka({
//   clientId: "outbox-processor",
//   brokers: ["192.168.0.67:9092"], // host IP
// });

// export default async function consumer() {
//   console.log("Control is inside the consumer function");

//   const consumer = kafka.consumer({ groupId: "execution-group" });
//   await consumer.connect();
//   await consumer.subscribe({
//     topic: TOPIC_NAME,
//     fromBeginning: true,
//   });

//   await consumer.run({
//     autoCommit: false,
//     eachMessage: async ({ topic, partition, message }) => {
//       if (!message.value) return;

//       const workflow = JSON.parse(message.value.toString());
//       console.log(
//         "Workflow received from Kafka:",
//         workflow,
//         "Partition: ",
//         partition,
//         "Offset: ",
//         message.offset,
//       );

//       await new Promise((r) => setTimeout(r, 3000));

//       for (const node of workflow.nodes.iNodes) {
//         let nodeType = node.type;

//         if (nodeType === "emailNode") {
//           // email node execution
//           // await executeEmailNode(workflow);
//         }
//         if (nodeType === "telegramNode") {
//           // telegram node execution
//           // await executeTelegramNode(workflow);
//         }
//         if (nodeType === "ai-agentNode") {
//           // ai agent node execution
//           // await executeAiAgentNode(workflow);
//         }
//       }

//       // use :- next message the consumer should read when it resumes
//       consumer.commitOffsets([
//         {
//           topic: TOPIC_NAME,
//           partition: partition,
//           // when resumed the exact logged message is again logged
//           // beacuse here the last offset + 1 is added
//           offset: parseInt(message.offset + 1).toString(),
//         },
//       ]);
//     },
//   });
// }

// console.log("control is inside the consumer file");

// export default function consumer() {
//   console.log("control is inside the consume file");
// }
