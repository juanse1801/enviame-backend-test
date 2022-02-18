import DeliveryContract from "../models/DeliveryContract.js";

const createDelivery = async (req, res) => {
  try {
    const { orderId, products, originAddres, destination } = req.body;
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
