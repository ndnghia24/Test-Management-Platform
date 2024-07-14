'use strict';

const { create } = require('express-handlebars');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('releases', [
      {
        release_id: 1,
        project_id: 1,
        name: 'Release 1',
        release_key: 'Templer',
        release_progress: 0,
        release_status: 'open',
        start_date: new Date('2024-02-05 00:00:00'),
        due_date: new Date('2024-06-06 00:00:00'),
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        release_id: 2,
        project_id: 1,
        name: 'Release 2',
        release_key: 'Falcon',
        release_progress: 0,
        release_status: 'upcoming',
        start_date: new Date('2024-06-07 00:00:00'),
        due_date: new Date('2024-09-15 00:00:00'),
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        release_id: 3,
        project_id: 1,
        name: 'Release 3',
        release_key: 'Eagle',
        release_progress: 0,
        release_status: 'completed',
        start_date: new Date('2024-09-16 00:00:00'),
        due_date: new Date('2024-12-20 00:00:00'),
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        release_id: 4,
        project_id: 1,
        name: 'Hotfix 1.1',
        release_key: 'Hawk',
        release_status: 'open',
        start_date: new Date('2024-07-01 00:00:00'),
        due_date: new Date('2024-07-10 00:00:00'),
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('releases', null, {});
  }
};
