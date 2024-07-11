'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role', [
      {
        role_id: 1,
        role: 'Manager',
        description: 'Do all thing'
      },
      {
        role_id: 2,
        role: 'Tester',
        description: 'Do some thing'
      },
      {
        role_id: 3,
        role: 'Developer',
        description: 'Only view and comment'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role', null, {});
  }
};
