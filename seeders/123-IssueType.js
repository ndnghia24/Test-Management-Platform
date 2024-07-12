'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const issueTypes = [
      { issue_type_id: 1, type: 'Not Applicable' },
      { issue_type_id: 2, type: 'UI/Design' },
      { issue_type_id: 3, type: 'Performance' },
      { issue_type_id: 4, type: 'Validations' },
      { issue_type_id: 5, type: 'Functionality' },
      { issue_type_id: 6, type: 'SEO' },
      { issue_type_id: 7, type: 'Server Error' }
    ];

    issueTypes.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('issue_type', issueTypes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('issue_type', null, {});
  }
};
