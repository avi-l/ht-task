'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('qqkxitfu', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currentValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      loanAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      risk: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('qqkxitfu');
  },
};

