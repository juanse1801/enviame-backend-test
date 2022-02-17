import express from "express";

//MIDDLEWARES
import verifyToken from "../middlewares/verify-token.js";
import verifyRol from "../middlewares/verify-rol.js";

const router = express.Router();

import {
  signUpUser,
  createSeller,
  SingIn,
  listSellers,
  getSeller,
  editSeller,
  deleteSeller,
  sellerInfo,
  sellerOwnEdit,
} from "../services/users.service.js";

//ADMIN USER ROUTES
router.get("/list-sellers", [verifyToken, verifyRol], listSellers);

router.get("/get-seller", [verifyToken, verifyRol], getSeller);

router.post("/create-seller", [verifyToken, verifyRol], createSeller);

router.put("/edit-seller", [verifyToken, verifyRol], editSeller);

router.delete("/delete-seller", [verifyToken, verifyRol], deleteSeller);

// SELLER USER ROUTES
router.get("/seller-info", [verifyToken], sellerInfo);

router.get("/seller-own-edit", [verifyToken], sellerOwnEdit);

//NORMAL USER ROUTES

// INTERNET USER ROUTES
router.post("/signup", signUpUser);

router.post("/signin", SingIn);

export default router;
