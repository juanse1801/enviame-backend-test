import { Model, DataTypes, Sequelize } from "sequelize";
import { USER_TABLE } from "../models/User.js";

const PRODUCT_TABLE = "products";

const productSchema = {
  sku: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  sellerId: {
    field: "seller_id",
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

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: "sellerUser" });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}

export { PRODUCT_TABLE, productSchema, Product };
