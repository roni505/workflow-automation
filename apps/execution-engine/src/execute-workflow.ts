import { Kafka } from "kafkajs";
import { getCredentials } from "./workflow/credentials";
import { executeEmailNode } from "./executors";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function ensureTopicExists() {
  const admin = kafka.admin();
  await admin.connect();

  const topics = await admin.listTopics();

  if (!topics.includes(TOPIC_NAME)) {
    console.log("Topic does not exist");

    await admin.createTopics({
      topics: [
        {
          topic: TOPIC_NAME,
          numPartitions: 3,
          replicationFactor: 1,
        },
      ],
    });
    console.log("Topic created");
  } else {
    console.log("Topic already exists");
  }

  await admin.disconnect();
}

export const TOPIC_NAME = "workflow-execution";

export default async function consumer() {
  console.log("Control is inside the consumer function");

  await ensureTopicExists();

  const consumer = kafka.consumer({ groupId: "execution-group" });
  await consumer.connect();
  await consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: false,
  });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      const workflow = JSON.parse(message.value.toString());
      console.log(
        "Workflow received from Kafka:",
        workflow,
        "Partition: ",
        partition,
        "Offset: ",
        message.offset,
      );

      // await new Promise((r) => setTimeout(r, 3000));

      // validate workflow.nodes
      if (Array.isArray(workflow.nodes)) {
        // console.log("Workflow.nodes is an array", workflow.nodes);
        const credentialId = workflow.nodes
          .filter((node: any) => node.credentialId)
          .map((node: any) => node.credentialId);
        console.log("This are the nodes: ", workflow.nodes);

        // console.log("This is the credentail id of the workflow", credentialId);

        const data = workflow.nodes.map((node: any) => node.data);
        // console.log("This is the form data: ", data);

        credentialId.forEach(async (element: any) => {
          const credentialsData = await getCredentials(element);

          // console.log(
          //   "This is the credential data outside the loop: ",
          //   credentialsData,
          // );

          if (!credentialsData) {
            return console.log("Credentials data is empty");
          }

          let previousOutput: any = null;

          for (const node of workflow.nodes) {
            let nodeType = node.actionData.nodeType;
            let output;

            // console.log("Node type: ", nodeType);

            if (nodeType === "gmailNode") {
              // console.log("This is a email node");

              // const emailCredential = credentialsData.find(
              //   (data) => data.platform,
              // );

              // console.log(
              //   "This is the credential data inside the loop: ",
              //   credentialsData,
              // );

              // email node execution
              output = await executeEmailNode(
                node,
                credentialsData,
                previousOutput,
              );
            }
            if (nodeType === "telegramNode") {
              // console.log("This is a telegramNode");
              // telegram node execution
              // await executeTelegramNode(workflow);
            }
            if (nodeType === "aiAgentNode") {
              // console.log("This is an ai-agent node");
              // ai agent node execution
              // await executeAiAgentNode(workflow);
            }
            previousOutput = output;
          }
        });
      }

      // use :- next message the consumer should read when it resumes
      consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          // when resumed the exact logged message is again logged
          // beacuse here the last offset + 1 is added
          offset: parseInt(message.offset + 1).toString(),
        },
      ]);
    },
  });
}
consumer();
