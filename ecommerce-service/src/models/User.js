import { Model, DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";
const USER_TABLE = "users";

const userSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
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
      foreignKey: "seller_id",
    });
    this.hasMany(models.Order, {
      as: "orders",
      foreignKey: "customer_id",
    });
    this.hasMany(models.Order, {
      as: "buyorders",
      foreignKey: "seller_id",
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

  async validatePassword(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }
}

export { USER_TABLE, userSchema, User };
