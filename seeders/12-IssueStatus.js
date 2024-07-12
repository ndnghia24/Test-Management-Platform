'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const issueStatuses = [
      { issue_status_id: 1, status: 'New' },
      { issue_status_id: 2, status: 'Open' },
      { issue_status_id: 3, status: 'Assigned' },
      { issue_status_id: 4, status: 'Resolved' },
      { issue_status_id: 5, status: 'Retest' },
      { issue_status_id: 6, status: 'Verified' },
      { issue_status_id: 7, status: 'Reopened' },
      { issue_status_id: 8, status: 'Closed' },
      { issue_status_id: 9, status: 'Deferred' },
      { issue_status_id: 10, status: 'Rejected' },
      { issue_status_id: 11, status: 'Duplicate' }
    ];

    issueStatuses.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('issue_status', issueStatuses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('issue_status', null, {});
  }
};
