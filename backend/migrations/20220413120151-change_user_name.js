'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "name", "last_name");
    await queryInterface.renameColumn("Users", "createdAt", "created_at");
    await queryInterface.renameColumn("Users", "updatedAt", "updated_at");

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "last_name", "name");
    await queryInterface.renameColumn("Users", "created_at", "createdAt");
    await queryInterface.renameColumn("Users", "updated_at", "updatedAt");
  }
};
