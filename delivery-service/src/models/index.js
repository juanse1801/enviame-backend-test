import { User, userSchema } from "./User.js";
import { Product, productSchema } from "./Product.js";
import { Order, orderSchema } from "./Orders.js";
import { OrderProduct, orderProductShema } from "./order-product.js";

const setUpModels = (sequelize) => {
  User.init(userSchema, User.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrderProduct.init(orderProductShema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
};

export default setUpModels;
