import deliverys from "./deliverys.js";

const routesConfig = (app) => {
  const paths = {
    deliverys: `/api/v1.0/deliverys`,
  };

  app.use(paths.deliverys, deliverys);
};

export default routesConfig;
