import TrackingHistory from "../models/TrackingHistory.js";
import DeliveryContract from "../models/DeliveryContract.js";

const getTracking = async (req, res) => {
  try {
    const { tracking_id } = req.query;

    const findHistory = await TrackingHistory.find({
      tracking_id: tracking_id,
    });
    const findContract = await DeliveryContract.findOne({
      tracking_number: tracking_id,
    });
    res.json({
      tracking_number: tracking_id,
      status: findContract.status,
      tracking: findHistory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Sever Error" });
  }
};

export { getTracking };
