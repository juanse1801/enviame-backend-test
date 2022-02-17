import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const { id: sellerId } = req.user;
    const product = await Product.findOne({
      where: { sku: id, seller_id: sellerId },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllMyProducts = async (req, res) => {
  try {
    const { id: sellerId } = req.user;
    const products = await Product.findAll({
      where: { seller_id: sellerId },
      include: ["sellerUser"],
    });
    res.json(products);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, stock } = req.body;
    const { id } = req.user;
    const sellerUser = await User.findByPk(id);

    if (!sellerUser.address) {
      return res.status(403).json({
        message:
          "Sellers needs to provide an address first to sell products, please update your address",
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      stock,
      seller_id: id,
    });
    res.json(newProduct);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { name, description, stock } = req.body;
    const { id: sellerId } = req.user;
    const { sku } = req.query;

    await Product.update(
      { name, description, stock },
      { where: { sku, seller_id: sellerId } }
    );
    res.status(201).json({ message: `Producto ${sku} was updated` });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: sellerId } = req.user;
    const { sku } = req.query;

    await Product.destroy({ where: { sku, seller_id: sellerId } });
    res.status(201).json({ message: `Producto ${sku} was deleted` });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getProduct,
  getAllMyProducts,
  createProduct,
  editProduct,
  deleteProduct,
};
