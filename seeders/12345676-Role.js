'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role', [
      {
        role_id: 1,
        role: 'Manager',
        description: 'Do all thing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 2,
        role: 'Tester',
        description: 'Do some thing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 3,
        role: 'Developer',
        description: 'Only view and comment',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role', null, {});
  }
};
