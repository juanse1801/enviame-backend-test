import deliverys from "./deliverys.js";
import trackingHistory from "./trackingHistory.js";

const routesConfig = (app) => {
  const paths = {
    deliverys: `/api/v1.0/deliverys`,
    tracking: `/api/v1.0/tracking`,
  };

  app.use(paths.deliverys, deliverys);
  app.use(paths.tracking, trackingHistory);
};

export default routesConfig;
