'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // User mis au pluriel
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'user_id');
  }
};
