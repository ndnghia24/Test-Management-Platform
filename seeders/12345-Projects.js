'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [
      {
        project_id: 1,
        name: 'Instagram Clone',
        description: 'The clone version of insta',
        created_by: 1,
        created_date: new Date('2024-05-20'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        project_id: 2,
        name: 'Tiktok-like',
        description: 'The same app with tiktok',
        created_by: 2,
        created_date: new Date('2024-05-20'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
