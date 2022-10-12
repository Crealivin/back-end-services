'use strict';

const { toDefaultValue } = require('sequelize/types/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      endorseId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      paymentAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      expiredDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      paymentDate: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};