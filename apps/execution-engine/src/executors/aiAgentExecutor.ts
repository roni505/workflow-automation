import { Credentials, Node } from "@repo/types/workflow";
import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyAxB8nfB5F1Ukabn2nwTQWL_tFjphunCg0";

export async function executeAiAgentNode(
  node: Node,
  credentialsData: Credentials[],
  previousOutput?: any,
) {
  const { prompt } = node.data;

  const apiKey = credentialsData[0]?.data.apiKey;
  const model = credentialsData[0]?.data.model;

  if (!apiKey || !model) {
    return console.log("API or Model is empty");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
  });

  console.log("Res from aiAgent node: ", response.text);
}
