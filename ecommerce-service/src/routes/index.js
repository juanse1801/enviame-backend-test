import users from "./users.js";
import products from "./products.js";
import orders from "./orders.js";

const routesConfig = (app) => {
  const paths = {
    users: `/api/v1.0/users`,
    products: `/api/v1.0/products`,
    orders: `/api/v1.0/orders`,
  };

  app.use(paths.users, users);
  app.use(paths.products, products);
  app.use(paths.orders, orders);
};

export default routesConfig;
