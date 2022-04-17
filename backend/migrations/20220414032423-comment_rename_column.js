'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Comments", "createdAt", "created_at");
    await queryInterface.renameColumn("Comments", "updatedAt", "updated_at");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Comments", "created_at", "createdAt");
    await queryInterface.renameColumn("Comments", "updated_at", "updatedAt");
  }
};
