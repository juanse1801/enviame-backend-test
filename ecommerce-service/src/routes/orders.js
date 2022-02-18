import express from "express";

//MIDDLEWARES
import verifyToken from "../middlewares/verify-token.js";
import verifySeller from "../middlewares/verify-seller.js";
import verifyRol from "../middlewares/verify-rol.js";
import verifyStock from "../middlewares/verify-stock.js";

import {
  changeOrderStatus,
  checkOrderStatus,
  createOrder,
  getAllOrders,
  getAnyOrder,
  getOrder,
  listMyOrders,
  updateOrderStatus,
  userCancelOrder,
} from "../services/orders.service.js";

const router = express.Router();

//ADMIN ORDERS ROUTES
router.get("/get-any-order", [verifyToken, verifyRol], getAnyOrder);

router.get("/all-orders", [verifyToken, verifyRol], getAllOrders);

router.put("/update-order-status", [verifyToken, verifyRol], updateOrderStatus);

//SELLERS ORDERS ROUTES
router.get("/get-order", [verifyToken, verifySeller], getOrder);

router.get("/list-my-orders", [verifyToken, verifySeller], listMyOrders);

router.put(
  "/change-order-status",
  [verifyToken, verifySeller],
  changeOrderStatus
);

// USERS ORDERS ROUTES
router.post("/create-order", [verifyToken, verifyStock], createOrder);

router.get("/check-order-status", verifyToken, checkOrderStatus);

router.put("/user-cancel-order", verifyToken, userCancelOrder);

export default router;
