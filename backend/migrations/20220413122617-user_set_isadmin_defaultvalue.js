'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'is_admin', {  
      allowNull: false,
      type: Sequelize.BOOLEAN,    
      defaultValue: 0
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'is_admin', {  
      allowNull: false,
      type: Sequelize.BOOLEAN,
    })
  }
};
