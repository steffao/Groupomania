'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue : 1,
    });
    await queryInterface.addColumn('Comments', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue : 1,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'is_active');
    await queryInterface.removeColumn('Comments', 'is_active');
  }
};
