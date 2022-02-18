import DeliveryContract from "../models/DeliveryContract.js";
import fetch from "node-fetch";

const getDelivery = async (req, res) => {
  try {
    const { tracking_number } = req.query;

    const delivery = await DeliveryContract.findOne({ tracking_number });
    res.json(delivery);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createDelivery = async (req, res) => {
  try {
    const { foreign_order_id, products, origin_address, destination } =
      req.body;

    const newDelivery = new DeliveryContract({
      foreign_order_id,
      products,
      origin_address,
      destination,
    });

    await newDelivery.save();
    res.json(newDelivery);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteDelivery = async (req, res) => {
  try {
    const { tracking_number } = req.query;

    await DeliveryContract.findOneAndDelete({ tracking_number });

    res.json({ message: "Delivery deleted" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const notifyStatusChange = async (order) => {
  await fetch(
    "http://ecommerce-service:3000/api/v1.0/orders/receive-notifications",
    {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }
  );
};

export { createDelivery, notifyStatusChange, deleteDelivery, getDelivery };
