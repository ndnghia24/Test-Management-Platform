'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('testcase_testrun', [
      { testcase_id: 1, testrun_id: 1, status_id: 1 , createdAt: new Date(), updatedAt: new Date() },
      { testcase_id: 2, testrun_id: 3, status_id: 2 , createdAt: new Date(), updatedAt: new Date() },
      { testcase_id: 3, testrun_id: 3, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 4, testrun_id: 4, status_id: 1 ,  createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 5, testrun_id: 5, status_id: 2 ,  createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 6, testrun_id: 2, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 7, testrun_id: 1, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 8, testrun_id: 8, status_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 9, testrun_id: 2, status_id: 3 ,  createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 10, testrun_id: 3, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 11, testrun_id: 11, status_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 12, testrun_id: 12, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 13, testrun_id: 13, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 14, testrun_id: 14, status_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 15, testrun_id: 15, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 16, testrun_id: 16, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 17, testrun_id: 2, status_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 18, testrun_id: 1, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 19, testrun_id: 1, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 20, testrun_id: 20, status_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 21, testrun_id: 3, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 22, testrun_id: 3, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 23, testrun_id: 1, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 24, testrun_id: 24, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 25, testrun_id: 25, status_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 26, testrun_id: 2, status_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 27, testrun_id: 2, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 28, testrun_id: 3, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 29, testrun_id: 29, status_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 30, testrun_id: 30, status_id: 3 , createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('testcase_testrun', null, {});
  }
};
