import { Model, DataTypes, Sequelize } from "sequelize";
const USER_TABLE = "users";

const userSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  rol: {
    allowNull: false,
    type: DataTypes.ENUM("ADMIN", "SELLER", "USER"),
    defaultValue: "USER",
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: "products",
      foreignKey: "sellerId",
    });
    this.hasMany(models.Order, {
      as: "orders",
      foreignKey: "customerId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

export { USER_TABLE, userSchema, User };
