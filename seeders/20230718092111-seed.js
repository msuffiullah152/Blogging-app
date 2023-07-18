"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "safi",
          email: "safi@safi.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          password: await bcrypt.hash("password", 8),
        },
      ],
      {}
    );
    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);

    const userId = users[0][0].id;

    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Cars",
          description: "red ferrsasri hsd 4 wheels",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userId,
        },
      ],
      {}
    );
    //
    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);

    const postId = posts[0][0].id;

    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content:
            "car with 4 wheels",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userId,
          PostId: postId,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("comments", null, {});
  },
};