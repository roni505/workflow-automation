// import { prisma } from "@repo/db";
// import { Router } from "express";

// const router: Router = Router();

// // this route saves the webhook in its table to avoid the searching of
// // all worflows for execution when an external req is hit (its slow & expensive).
// // Alos, execution is done with the workflow id but the external
// // server will not have the access of the ID.
// router.post("/webhook", async (req, res) => {
//   try {
//     const body = req.body;
//     console.log(
//       "This is the url that has been send from the frontend: ",
//       body.url,
//     );
//     const url = body.url;
//     const parts = url.split("/");
//     const webhookId = parts[parts.length - 1];

//     console.log("This is the id of the url: ", webhookId);

//     const webhook = await prisma.webhook.create({
//       data: {
//         id: webhookId,
//         URL: body.url,
//         user: {
//           connect: {
//             id: "347245f7-fd38-442f-b155-ad0f202d8575",
//           },
//         },
//       },
//     });
//     console.log("This is the url send from FE and saved in DB: ", webhook);
//     res.json({
//       message: "Webhook created",
//       webhook: webhook,
//     });
//   } catch (error) {
//     console.error("Failed registering the webhook route: ", error);
//     res.status(500).json({ error: "Failed to create webhook" });
//   }
// });

// export default router;
