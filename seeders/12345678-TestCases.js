'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const testCases = [
      {
        testcase_id: 1,
        name: 'Test Google Login',
        description: 'Test login functionality using Google',
        module_id: 2,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 2,
        name: 'Test Email Signup',
        description: 'Test signup functionality using Email',
        module_id: 1,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 3,
        name: 'Test Password Reset Email',
        description: 'Test password reset email functionality',
        module_id: 2,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 4,
        name: 'Test UI on Small Screens',
        description: 'Test UI responsiveness on small screens',
        module_id: 3,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 5,
        name: 'Test Profile Data Save',
        description: 'Test if profile data is saved correctly',
        module_id: 3,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 6,
        name: 'Test App Startup',
        description: 'Test application startup stability',
        module_id: 1,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 7,
        name: 'Test Notifications Functionality',
        description: 'Test if notifications are received',
        module_id: 1,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 8,
        name: 'Test Payment Gateway Integration',
        description: 'Test payment gateway processing',
        module_id: 1,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 9,
        name: 'Test Search Functionality',
        description: 'Test search feature for correct results',
        module_id: 1,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 10,
        name: 'Test Profile Picture Upload',
        description: 'Test uploading of profile pictures',
        module_id: 1,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 11,
        name: 'Test Login Performance',
        description: 'Test performance of login process',
        module_id: 3,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 12,
        name: 'Test API Security',
        description: 'Test for security vulnerabilities in API',
        module_id: 2,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 13,
        name: 'Test App on iOS 14',
        description: 'Test application stability on iOS 14',
        module_id: 2,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 14,
        name: 'Test Localization',
        description: 'Test if all texts are localized',
        module_id: 1,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 15,
        name: 'Test Email Verification Link',
        description: 'Test email verification link functionality',
        module_id: 1,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 16,
        name: 'Test Email Notification Delay',
        description: 'Test for delays in email notifications',
        module_id: 3,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 17,
        name: 'Test Profile Update Error',
        description: 'Test for server errors on profile update',
        module_id: 2,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 18,
        name: 'Test Forgot Password Link',
        description: 'Test forgot password link functionality',
        module_id: 2,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 19,
        name: 'Test Dark Mode UI',
        description: 'Test UI elements in dark mode',
        module_id: 3,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 20,
        name: 'Test Database Query Speed',
        description: 'Test speed of database queries',
        module_id: 3,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 21,
        name: 'Test Session Timeout',
        description: 'Test duration of user sessions',
        module_id: 1,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 22,
        name: 'Test Login Error Message',
        description: 'Test error messages on login failure',
        module_id: 2,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 23,
        name: 'Test Date Format Consistency',
        description: 'Test consistency of date formats',
        module_id: 1,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 24,
        name: 'Test Form Validation',
        description: 'Test form validation functionality',
        module_id: 1,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 25,
        name: 'Test Search Results Pagination',
        description: 'Test pagination in search results',
        module_id: 3,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 26,
        name: 'Test Multi-Factor Authentication',
        description: 'Test multi-factor authentication',
        module_id: 3,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 27,
        name: 'Test Report Totals Accuracy',
        description: 'Test accuracy of totals in reports',
        module_id: 3,
        created_by: 3,
        project_id: 1
      },
      {
        testcase_id: 28,
        name: 'Test Unexpected Logout',
        description: 'Test for unexpected logouts',
        module_id: 1,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 29,
        name: 'Test Profile Changes Reflection',
        description: 'Test if profile changes are reflected',
        module_id: 1,
        created_by: 1,
        project_id: 1
      },
      {
        testcase_id: 30,
        name: 'Test Mobile View',
        description: 'Test mobile view of the application',
        module_id: 2,
        created_by: 3,
        project_id: 1
      }
    ];

    testCases.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    
    await queryInterface.bulkInsert('test_cases', testCases, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_cases', null, {});
  }
};
