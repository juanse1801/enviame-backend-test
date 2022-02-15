import express from "express";
const router = express.Router();

import { signUpUser } from "../services/users.service.js";

router.post("/signup", signUpUser);

export default router;
