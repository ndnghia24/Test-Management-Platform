'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('test_case_linking', [
      { testcase_id: 1, linking_testcase_id: 2 },
      { testcase_id: 2, linking_testcase_id: 3 },
      { testcase_id: 3, linking_testcase_id: 4 },
      { testcase_id: 4, linking_testcase_id: 5 },
      { testcase_id: 5, linking_testcase_id: 6 },
      { testcase_id: 6, linking_testcase_id: 7 },
      { testcase_id: 7, linking_testcase_id: 8 },
      { testcase_id: 8, linking_testcase_id: 9 },
      { testcase_id: 9, linking_testcase_id: 10 },
      { testcase_id: 10, linking_testcase_id: 11 },
      { testcase_id: 11, linking_testcase_id: 12 },
      { testcase_id: 12, linking_testcase_id: 13 },
      { testcase_id: 13, linking_testcase_id: 14 },
      { testcase_id: 14, linking_testcase_id: 15 },
      { testcase_id: 15, linking_testcase_id: 16 },
      { testcase_id: 16, linking_testcase_id: 17 },
      { testcase_id: 17, linking_testcase_id: 18 },
      { testcase_id: 18, linking_testcase_id: 19 },
      { testcase_id: 19, linking_testcase_id: 20 },
      { testcase_id: 20, linking_testcase_id: 21 },
      { testcase_id: 21, linking_testcase_id: 22 },
      { testcase_id: 22, linking_testcase_id: 23 },
      { testcase_id: 23, linking_testcase_id: 24 },
      { testcase_id: 24, linking_testcase_id: 25 },
      { testcase_id: 25, linking_testcase_id: 26 },
      { testcase_id: 26, linking_testcase_id: 27 },
      { testcase_id: 27, linking_testcase_id: 28 },
      { testcase_id: 28, linking_testcase_id: 29 },
      { testcase_id: 29, linking_testcase_id: 30 },
      { testcase_id: 30, linking_testcase_id: 1 }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_case_linking', null, {});
  }
};
