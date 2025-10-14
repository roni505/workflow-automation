import nodemailer from "nodemailer";
import { Credentials, Node } from "@repo/types/workflow";

export async function executeEmailNode(
  node: Node,
  credentialsData: Credentials[],
  previousOutput?: any,
) {
  // extract the data
  // const nodesData = workflow.nodes.map((d) => {
  //   return d.data;
  // });
  // console.log("This is the nodesData: ", nodesData);

  const nodeData = node.data;

  console.log("This is nodes data: ", nodeData);

  // fromData
  const { sendTo, message, subject } = node.data;

  console.log(
    `Send email to ${sendTo}, message: ${message}, subject: ${subject}`,
  );

  // console.log("This is the data of the single emailNode node: ", nodeData);
  // console.log("This is the credentials: ", credentialsData);
  const email = credentialsData[0]?.data.email;
  const appPassword = credentialsData[0]?.data.appPassword;

  console.log("This is the email: ", email);
  console.log("This is the appPassword: ", appPassword);

  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email,
      pass: appPassword,
    },
  });

  // user: "ronimukherjeeadra86@gmail.com",
  // pass: "qntq dcjd vbfh hoat",

  // here will have to add the formData
  const info = await transporter.sendMail({
    from: email,
    to: sendTo,
    subject: subject,
    text: message,
    html: `<b>${message}</b>`,
  });

  console.log("Message sent:", info.messageId);
}
