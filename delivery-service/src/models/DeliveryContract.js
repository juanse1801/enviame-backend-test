import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    foreign_order_id: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          sku: { type: String },
          name: { type: String },
          qty: { type: Number },
        },
      ],
      required: true,
    },
    origin_address: {
      type: String,
      required: true,
    },
    destination: {
      type: {
        name: { type: String },
        address: { type: String },
      },
    },
    tracking_number: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
      required: true,
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
  },
  {
    versionKey: false,
  }
);

const DeliveryContract = mongoose.model("deliverycontract", deliverySchema);

export default DeliveryContract;
