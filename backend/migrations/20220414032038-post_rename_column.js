'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Posts", "createdAt", "created_at");
    await queryInterface.renameColumn("Posts", "updatedAt", "updated_at");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Posts", "created_at", "createdAt");
    await queryInterface.renameColumn("Posts", "updated_at", "updatedAt");
  }
};
