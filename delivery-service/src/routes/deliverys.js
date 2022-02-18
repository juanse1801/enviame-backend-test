import express from "express";

const router = express.Router();

router.get("/get-delivery");

router.post("/create-delivery");

router.put("/change-delivery-status");

router.delete("/delete-delivery");

export default router;
