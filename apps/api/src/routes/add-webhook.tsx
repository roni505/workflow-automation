import { Router } from "express";

const router: Router = Router();

router.post("/webhook/register", (req, res) => {
  try {
    const body = req.body;
  } catch (error) {
    console.error("Failed executing the webhook route: ", error);
  }
});
