'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const issuePriorities = [
      { issue_priority_id: 1, priority: 'High' },
      { issue_priority_id: 2, priority: 'Medium' },
      { issue_priority_id: 3, priority: 'Low' }
    ];

    issuePriorities.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('issue_priority', issuePriorities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('issue_priority', null, {});
  }
};
