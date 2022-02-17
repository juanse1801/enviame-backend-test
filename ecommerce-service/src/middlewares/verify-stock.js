import { Product } from "../models/Product.js";

const verifyStock = async (req, res, next) => {
  const { cart } = req.body;

  let validate = {
    status: false,
    products: [],
  };

  for (let i = 0; i < cart.length; i++) {
    let product = await Product.findByPk(cart[i].sku);
    if (product.stock < cart[i].amount) {
      console.log("HEY");
      validate.status = true;
      validate.products.push(product.sku);
    }
  }

  if (validate.status) {
    return res.status(400).json({
      message: `Check out the stock of products`,
      stock_out: validate.products,
    });
  } else {
    next();
  }
};

export default verifyStock;
