"use strict";
const { hashPassword } = require("../helpers/bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Haryo",
          email: "haryosee@gmail.com",
          password: hashPassword("dewufnbwifr92j9i2"),
          address: "-",
          role: "Admin",
          photoUrl: "-",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Joshua",
          email: "joshsudarso19@gmail.com",
          password: hashPassword("smio28934ng02m"),
          role: "Customer",
          address: "-",
          photoUrl: "-",
        },
        {
          name: "Joshua",
          email: "joshsmtpng19@gmail.com",
          password: hashPassword("kdor02jmc9w39"),
          role: "Customer",
          address: "-",
          photoUrl: "-",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
