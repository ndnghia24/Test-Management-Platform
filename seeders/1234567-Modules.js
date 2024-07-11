'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('modules', [
      {
        module_id: 1,
        name: 'Homepage',
        root_module_id: null,
        level: 1,
        project_id: 1
      },
      {
        module_id: 2,
        name: 'TestCasePage',
        root_module_id: 1,
        level: 1,
        project_id: 1
      },
      {
        module_id: 3,
        name: 'IssuePage',
        root_module_id: 2,
        level: 1,
        project_id: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null, {});
  }
};
