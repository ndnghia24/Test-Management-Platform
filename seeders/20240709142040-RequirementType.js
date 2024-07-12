'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('requirement_types', [
      {
        requirement_type_id: 1,
        name: 'UI',
        description: 'All things related to UI',
        release_id: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        requirement_type_id: 2,
        name: 'Functionality',
        description: 'Related to functionality',
        release_id: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        requirement_type_id: 3,
        name: 'Integrity',
        description: 'Security and integrity related requirements',
        release_id: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requirement_types', null, {});
  }
};
