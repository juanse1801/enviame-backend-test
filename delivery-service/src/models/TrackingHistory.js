import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    tracking_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      required: true,
      type: String,
      enum: [
        "READY_FOR_PICK_UP",
        "AT_ORIGIN",
        "EN_ROUTE_OF_DELIVERY",
        "NOT_DELIVERED",
        "DELIVERED",
      ],
      default: "READY_FOR_PICK_UP",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const TrackingHistory = mongoose.model("trackinghistory", trackingSchema);

export default TrackingHistory;
