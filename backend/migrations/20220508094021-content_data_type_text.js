'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.changeColumn('Comments', 'content', {
      type: Sequelize.TEXT,
      allowNull: false,
    })
    await  queryInterface.changeColumn('Posts', 'content', {
      type: Sequelize.TEXT,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.changeColumn('Comments', 'content', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await  queryInterface.changeColumn('Posts', 'content', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  }
};

