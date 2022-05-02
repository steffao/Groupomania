'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Posts", "attachment", "media_url");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Posts", "media_url", "attachment");
  }
};
