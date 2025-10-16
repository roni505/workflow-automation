import nodemailer from "nodemailer";
import { Credentials, Node } from "@repo/types/workflow";

export async function executeEmailNode(
  node: Node,
  credentialsData: Credentials[],
  previousOutput?: any,
) {
  try {
    // couz we are passing a single node here
    const nodeData = node.data;

    console.log("This is nodes data: ", nodeData);

    // formData
    const { sendTo, message, subject } = node.data;

    console.log(
      `Send email to ${sendTo}, message: ${message}, subject: ${subject}`,
    );

    // console.log("This is the data of the single emailNode node: ", nodeData);
    // console.log("This is the credentials: ", credentialsData);
    const email = credentialsData[0]?.data.email;
    const appPassword = credentialsData[0]?.data.appPassword;

    if (!email || !appPassword) {
      return console.log("Email or pass is empty");
    }

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

    return {
      success: true,
      data: {
        messageId: info.messageId,
        from: email,
        subject: subject,
        sentAt: new Date().toISOString(),
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected,
      },
    };
  } catch (error) {
    console.error("Error while executing the gmail node: ", error);
  }
}
