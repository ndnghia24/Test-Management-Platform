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
        status_name: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_id: 3,
        status_name: 'Solved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_run_test_case_status', null, {});
  }
};
