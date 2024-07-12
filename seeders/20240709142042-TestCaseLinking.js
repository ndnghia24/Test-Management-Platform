'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('test_case_linking', [
      { testcase_id: 1, linking_testcase_id: 2 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 2, linking_testcase_id: 3 ,  createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 3, linking_testcase_id: 4 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 4, linking_testcase_id: 5 ,createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 5, linking_testcase_id: 6 ,createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 6, linking_testcase_id: 7 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 7, linking_testcase_id: 8 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 8, linking_testcase_id: 9 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 9, linking_testcase_id: 10 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 10, linking_testcase_id: 11 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 11, linking_testcase_id: 12 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 12, linking_testcase_id: 13 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 13, linking_testcase_id: 14 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 14, linking_testcase_id: 15 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 15, linking_testcase_id: 16 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 16, linking_testcase_id: 17 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 17, linking_testcase_id: 18 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 18, linking_testcase_id: 19 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 19, linking_testcase_id: 20 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 20, linking_testcase_id: 21 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 21, linking_testcase_id: 22 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 22, linking_testcase_id: 23 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 23, linking_testcase_id: 24 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 24, linking_testcase_id: 25 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 25, linking_testcase_id: 26 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 26, linking_testcase_id: 27 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 27, linking_testcase_id: 28 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 28, linking_testcase_id: 29 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 29, linking_testcase_id: 30 , createdAt: new Date(), updatedAt: new Date()},
      { testcase_id: 30, linking_testcase_id: 1 , createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_case_linking', null, {});
  }
};
