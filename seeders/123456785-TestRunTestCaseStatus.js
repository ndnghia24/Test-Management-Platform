'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('test_run_test_case_status', [
      {
        status_id: 1,
        status_name: 'New',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_id: 2,
        status_name: 'Blocked',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_id: 3,
        status_name: 'Pass',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_id: 4,
        status_name: 'Fail',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_run_test_case_status', null, {});
  }
};
