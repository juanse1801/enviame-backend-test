import express from "express";
import { getTracking } from "../services/trackingHistory.service.js";

const router = express.Router();

router.get("/get-tracking", getTracking);

export default router;
