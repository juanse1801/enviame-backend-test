import { Order } from "../models/Orders.js";
import { OrderProduct } from "../models/order-product.js";
import { Product } from "../models/Product.js";
import sequelize from "../database/db.js";
import fetch from "node-fetch";

const createOrder = async (req, res) => {
  try {
    const { customerId, cart, sellerId } = req.body;

    const newOrder = await Order.create({
      customer_id: customerId,
      seller_id: sellerId,
    });

    for (let i = 0; i < cart.length; i++) {
      await OrderProduct.create({
        order_id: newOrder.id,
        product_id: cart[i].sku,
        amount: cart[i].amount,
      });
      await Product.update(
        { stock: sequelize.literal(`stock - ${cart[i].amount}`) },
        { where: { sku: cart[i].sku } }
      );
    }
    res.json(newOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const listMyOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.findAll({
      where: { seller_id: id },
      include: ["items"],
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.query;
    const { id: sellerId } = req.user;

    const order = await Order.findOne({
      where: { id: orderId, seller_id: sellerId },
    });

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.query;
    const { id: sellerId } = req.user;

    await Order.update(
      { order_status: status },
      { where: { id: orderId, seller_id: sellerId } }
    );
    if (status === "DISPATCHED") {
      const order = await Order.findByPk(orderId, {
        include: ["items", "sellerUser", "customerUser"],
      });
      const deliveryContract = {
        foreign_order_id: order.id,
        products: order.items.map((el) => {
          return {
            sku: el.sku,
            name: el.name,
            amount: el.OrderProduct.amount,
          };
        }),
        origin_address: order.sellerUser.address,
        destination: {
          name: order.customerUser.name,
          address: order.customerUser.address,
        },
      };
      const response = await fetch(
        "http://delivery-service:3000/api/v1.0/deliverys/create-delivery",
        {
          method: "POST",
          body: JSON.stringify(deliveryContract),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json());

      res.json(response);
    } else {
      return res.json({ message: `Order ${orderId} was updated` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userCancelOrder = async (req, res) => {
  try {
    const { orderId } = req.query;
    const { id } = req.user;
    const order = await Order.findOne({
      where: { id: orderId, customer_id: id },
      include: ["items"],
    });
    if (
      order.order_status === "CONFIRMED" ||
      order.order_status === "CREATED"
    ) {
      await Order.update(
        { order_status: "CANCELED" },
        { where: { id: orderId, customer_id: id } }
      );
      for (let i = 0; i < order.items.length; i++) {
        await Product.update(
          {
            stock: sequelize.literal(
              `stock + ${order.items[i].OrderProduct.amount}`
            ),
          },
          { where: { sku: order.items[i].sku } }
        );
      }
      res.json({ message: "Order Canceled" });
    } else {
      res.status(400).json({ message: "Order cant be canceled " });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAnyOrder = async (req, res) => {
  try {
    const { orderId } = req.query;

    const order = await Order.findByPk(orderId, { include: ["items"] });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.findAll({ include: ["items"] });
    res.json(allOrders);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.query;

    await Order.update({ order_status: status }, { where: { id: orderId } });
    if (status === "DISPATCHED") {
      const order = Order.findByPk(orderId, { include: ["items"] });
      const deliveryContract = {
        foreign_order_id: order.id,
        products: [],
        origin_address: "Juan",
        destination: {
          name: "Juanse",
          address: "calle 46",
        },
      };
      console.log(order);
      console.log(deliveryContract);
    } else {
      return res.json({ message: `Order ${orderId} was updated` });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.query;

    const order = await Order.findByPk(orderId);
    if (order) {
      res.json(order.order_status);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const receiveNotifications = async (req, res) => {
  try {
    console.log(req.body);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createOrder,
  listMyOrders,
  getOrder,
  changeOrderStatus,
  userCancelOrder,
  getAnyOrder,
  getAllOrders,
  updateOrderStatus,
  checkOrderStatus,
  receiveNotifications,
};
