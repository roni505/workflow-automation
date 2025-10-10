import nodemailer from "nodemailer";
import { prisma } from "@repo/db";

export async function executeEmailNode(workflow: any) {
  // {
  //   "name": "My Email Credential",
  //   "platform": "EMAIL",
  //   "data": {
  //     "email": "example@example.com",
  //     "password": "password123"
  //   },
  //   "user_Id": "user-uuid-here"
  // }

  await prisma.credentials.findUnique({
    where: {
      id: workflow.id,
      user_Id: "dsfjhdsfh",
    },
  });
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  // Wrap in an async IIFE so we can use await.
  (async () => {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
  })();
}
