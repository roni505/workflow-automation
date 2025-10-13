import nodemailer from "nodemailer";
import { prisma } from "@repo/db";
import { Credentials, WorkFlow } from "@repo/types/workflow";

export async function executeEmailNode(
  workflow: WorkFlow,
  credentialsData: Credentials[],
) {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ronimukherjeeadra86@gmail.com",
      pass: "qntq dcjd vbfh hoat",
    },
  });

  const info = await transporter.sendMail({
    from: "ronimukherjeeadra86@gmail.com",
    to: "ronimukherjeeadra@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent:", info.messageId);
}
