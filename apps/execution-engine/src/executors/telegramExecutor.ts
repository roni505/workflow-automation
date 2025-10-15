import { Credentials, Node } from "@repo/types/workflow";
import axios from "axios";

export async function executeTelegramNode(
  node: Node,
  credentialsData: Credentials[],
  previousOutput?: any,
) {
  // telegram cred name, botToken, chaId
  console.log(
    "This is the data of the telegram node: ",
    credentialsData[0]?.data,
  );

  if (!credentialsData.length) {
    console.error("No credentials found for telegram node");
    return;
  }

  const botToken = credentialsData[0]?.data.botToken;
  const chatId = credentialsData[0]?.data.chatId;

  // formData
  const { message } = node.data;
  console.log("This is the message: ", message);

  const URL = `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    const response = await axios.post(URL, {
      chat_id: chatId,
      text: message,
    });
    const data = response.data;
    previousOutput = data;
    return console.log("This is the res from the telegram post url: ", data);
  } catch (error) {
    console.error("Error in telegramNode executor: ", error);
  }
  return previousOutput;
}

// https://api.telegram.org/bot8321322591:AAETL-6T1zjEFP1SpclALwlCoUPpDzAXnyg/getUpdates

// 8321322591:AAETL-6T1zjEFP1SpclALwlCoUPpDzAXnyg
