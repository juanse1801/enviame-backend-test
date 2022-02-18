"use strict";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const adminHasH = await bcrypt.hash("admin2022", salt);
    const userHash = await bcrypt.hash("user2022", salt);
    const sellerHash = await bcrypt.hash("seller2022", salt);

    return queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        name: "ADMIN USER",
        email: "admin@gmail.com",
        password: adminHasH,
        rol: "ADMIN",
        address: "Calle 46 #112-51",
        create_at: Date.now(),
      },
      {
        id: uuidv4(),
        name: "SELLER USER",
        email: "seller@gmail.com",
        password: sellerHash,
        rol: "SELLER",
        address: "Calle 14 #12-22",
        create_at: Date.now(),
      },
      {
        id: uuidv4(),
        name: "NORMAL USER",
        email: "user@gmail.com",
        password: userHash,
        rol: "ADMIN",
        address: "Calle 9 #56-02",
        create_at: Date.now(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
