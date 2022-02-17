import express from "express";

//MIDDLEWARES
import verifyToken from "../middlewares/verify-token.js";
import verifySeller from "../middlewares/verify-seller.js";

import {
  getProduct,
  getAllMyProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../services/products.service.js";

const router = express.Router();

router.get("/product", [verifyToken, verifySeller], getProduct);

router.get("/my-products", [verifyToken, verifySeller], getAllMyProducts);

router.post("/create-product", [verifyToken, verifySeller], createProduct);

router.put("/edit-product", [verifyToken, verifySeller], editProduct);

router.delete("/delete-product", [verifyToken, verifySeller], deleteProduct);

export default router;
