import { prisma } from "@repo/db";
import { Router } from "express";

const router: Router = Router();

// this route saves the webhook in its table to avoid the searching of
// all worflows for execution when an external req is hit (its slow & expensive).
// Alos, execution is done with the workflow id but the external
// server will not have the access of the ID.
router.post("/webhook/register", async (req, res) => {
  try {
    const body = req.body;
    console.log(
      "This is the url that has been send from the frontend: ",
      body.url,
    );

    // const { name, method, path, header, secret } = req.body;

    // if (!name || !method || !path) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }

    // const id = req.user_id;
    // const webhook = await prisma.webhook.create({
    //   data: {
    //     name: name,
    //     method: method,
    //     path: path,
    //     header: header,
    //     secret: secret,
    //     user: {
    //       connect: {
    //         id: "347245f7-fd38-442f-b155-ad0f202d8575",
    //       },
    //     },
    //   },
    // });
    res.json({
      message: "Webhook created",
      // webhook: webhook,
    });
  } catch (error) {
    console.error("Failed executing the webhook route: ", error);
    res.status(500).json({ error: "Failed to create webhook" });
  }
});

export default router;
