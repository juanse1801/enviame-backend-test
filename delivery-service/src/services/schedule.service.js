import cron from "node-cron";
import TrackingHistory from "../models/TrackingHistory.js";
import DeliveryContract from "../models/DeliveryContract.js";
import { notifyStatusChange } from "./delivery.service.js";

const statusChange = () => {
  cron.schedule("*/30 * * * * *", async () => {
    const findAllDeliverys = await DeliveryContract.find();
    const changeStatus = {
      READY_FOR_PICK_UP: "AT_ORIGIN",
      AT_ORIGIN: "EN_ROUTE_OF_DELIVERY",
      NOT_DELIVERED: "EN_ROUTE_OF_DELIVERY",
    };

    for (let i = 0; i < findAllDeliverys.length; i++) {
      if (findAllDeliverys[i].status !== "DELIVERED") {
        if (findAllDeliverys[i].status !== "EN_ROUTE_OF_DELIVERY") {
          await DeliveryContract.updateOne(
            { _id: findAllDeliverys[i]._id },
            {
              status: changeStatus[findAllDeliverys[i].status],
            }
          );
          // ADD A TRACKING HISTORY
          let newTracking = new TrackingHistory({
            tracking_id: findAllDeliverys[i].tracking_number,
            status: changeStatus[findAllDeliverys[i].status],
          });
          await newTracking.save();
          //ADD A NOTIFICATION
          notifyStatusChange({
            foreign_order_id: findAllDeliverys[i].foreign_order_id,
            tracking_id: findAllDeliverys[i].tracking_number,
            status: changeStatus[findAllDeliverys[i].status],
          });
        } else {
          const probabilities = ["NOT_DELIVERED", "DELIVERED"];
          const randomStatus =
            probabilities[Math.floor(Math.random() * probabilities.length)];
          await DeliveryContract.updateOne(
            { _id: findAllDeliverys[i]._id },
            {
              status: randomStatus,
            }
          );
          // ADD A TRACKING HISTORY
          let newTracking = new TrackingHistory({
            tracking_id: findAllDeliverys[i].tracking_number,
            status: randomStatus,
          });
          await newTracking.save();
          //ADD A NOTIFICATION
          notifyStatusChange({
            foreign_order_id: findAllDeliverys[i].foreign_order_id,
            tracking_id: findAllDeliverys[i].tracking_number,
            status: randomStatus,
          });
        }
      }
    }
  });
};

export default statusChange;
