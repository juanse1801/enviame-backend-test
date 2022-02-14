import { User, userSchema } from "./User.js";

const setUpModels = (sequelize) => {
  User.init(userSchema, User.config(sequelize));
};

export default setUpModels;
