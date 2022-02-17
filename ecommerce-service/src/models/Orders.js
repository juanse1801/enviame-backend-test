import { Model, DataTypes, Sequelize } from "sequelize";
import { USER_TABLE } from "./User.js";
const ORDER_TABLE = "order";

const orderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  order_status: {
    allowNull: false,
    type: DataTypes.ENUM(
      "CREATED",
      "CONFIRMED",
      "DISPATCHED",
      "DELIVERED",
      "CANCELED"
    ),
    defaultValue: "CREATED",
  },
  customer_id: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: "id",
    },
  },
  seller_id: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: "id",
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: "customerUser",
      foreignKey: "customer_id",
    });
    this.belongsTo(models.User, {
      as: "sellerUser",
      foreignKey: "seller_id",
    });
    this.belongsToMany(models.Product, {
      as: "items",
      through: models.OrderProduct,
      foreignKey: "order_id",
      otherKey: "product_id",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  }
}

export { ORDER_TABLE, orderSchema, Order };
