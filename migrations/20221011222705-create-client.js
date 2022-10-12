'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      contactNumber: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      email: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bankCode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bankNumber: {
        allowNull: true,
        unique: true,
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
    await queryInterface.dropTable('Clients');
  }
};