'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const testRuns = [
      {
        testrun_id: 1,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Google Login Tests',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 2,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Email Signup Tests',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 3,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Password Reset Email Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 4,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'UI Tests for Small Screens',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 5,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Profile Data Save Tests',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 6,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'App Startup Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 7,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Notifications Functionality',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 8,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Payment Gateway Integration',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 9,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Search Functionality Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 10,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Profile Picture Upload Tests',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 11,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'Login Performance Tests',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 12,
        created_by: 1,
        assigned_to: 2,
        testrun_title: 'API Security Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 13,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'App Stability on iOS 14',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 14,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Localization Tests',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 15,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Email Verification Link Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 16,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Email Notification Delay Tests',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 17,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Profile Update Error Tests',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 18,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Forgot Password Link Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 19,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Dark Mode UI Tests',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 20,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Database Query Speed Tests',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 21,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Session Timeout Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 22,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Login Error Message Tests',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 23,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Date Format Consistency Tests',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 24,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Form Validation Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 25,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Search Results Pagination',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 26,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Multi-Factor Authentication',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 27,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Report Totals Accuracy Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 28,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Unexpected Logout Tests',
        testrun_status: 'Completed',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 29,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Profile Changes Reflection',
        testrun_status: 'In Progress',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      },
      {
        testrun_id: 30,
        created_by: 3,
        assigned_to: 2,
        testrun_title: 'Mobile View Tests',
        testrun_status: 'Not Started',
        testcase_quantity: 1,
        release: 1,
        project_id: 1
      }
    ];

    testRuns.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert('test_runs', testRuns, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_runs', null, {});
  }
};
