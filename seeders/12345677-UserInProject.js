'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_in_project', [
      { user_id: 1, project_id: 1, role_id: 1, is_delete: false, createdAt: new Date(), updatedAt: new Date()},
      { user_id: 2, project_id: 1, role_id: 2, is_delete: false, createdAt: new Date(), updatedAt: new Date()},
      { user_id: 3, project_id: 1, role_id: 3, is_delete: false, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_in_project', null, {});
  }
};
