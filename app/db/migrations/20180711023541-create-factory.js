'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Factories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numChildren: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rangeMin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rangeMax: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      children: {
        allowNull: false,
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Factories');
  }
};
