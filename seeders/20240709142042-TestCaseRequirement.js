'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('test_case_requirement', [
      { testcase_id: 1, requirement_id: 1 ,createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 2, requirement_id: 2 ,createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 3, requirement_id: 3 ,createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 4, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 5, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 6, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 7, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 8, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 9, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 10, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 11, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 12, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 13, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 14, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 15, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 16, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 17, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 18, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 19, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 20, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 21, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 22, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 23, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 24, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 25, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 26, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 27, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 28, requirement_id: 1 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 29, requirement_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 30, requirement_id: 3 , createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_case_requirement', null, {});
  }
};
