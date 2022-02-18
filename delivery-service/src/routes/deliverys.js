import express from "express";

import {
  createDelivery,
  deleteDelivery,
  getDelivery,
} from "../services/delivery.service.js";

const router = express.Router();

router.get("/get-delivery", getDelivery);

router.post("/create-delivery", createDelivery);

router.delete("/delete-delivery", deleteDelivery);

export default router;
