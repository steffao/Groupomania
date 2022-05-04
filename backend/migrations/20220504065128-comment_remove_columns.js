'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'is_active');
    await queryInterface.removeColumn('Comments', 'attachment');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments', 'is_active', {
      allowNull: false,
      type: Sequelize.STRING
    });
    await queryInterface.createColumn('Comments', 'attachment', {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue : 1,
    });
  }
};
