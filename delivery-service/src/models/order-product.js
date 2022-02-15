import { Model, DataTypes, Sequelize } from "sequelize";
import { ORDER_TABLE } from "./Orders.js";
import { PRODUCT_TABLE } from "./Product.js";
const ORDER_PRODUCT_TABLE = "orders_products";

const orderProductShema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  orderId: {
    field: "order_id",
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: ORDER_TABLE,
      key: "id",
    },
  },
  productId: {
    field: "product_id",
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class OrderProduct extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: "OrderProduct",
      timestamps: false,
    };
  }
}

export { ORDER_PRODUCT_TABLE, orderProductShema, OrderProduct };
