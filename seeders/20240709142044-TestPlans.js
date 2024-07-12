'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('test_plans', [
      {
        testplan_id: 1,
        name: 'Test Login',
        description: 'Test all login methods to the system',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 2,
        name: 'Test User Registration',
        description: 'Comprehensive test for user registration methods',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 3,
        name: 'Test Password Management',
        description: 'Test password reset, change, and recovery',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 4,
        name: 'Test UI Responsiveness',
        description: 'Test UI on various screen sizes and devices',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 5,
        name: 'Test User Profile Features',
        description: 'Test all user profile management functionalities',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 6,
        name: 'Test Application Stability',
        description: 'Test application stability and performance',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 7,
        name: 'Test Notification System',
        description: 'Test the notification system\'s functionality and reliability',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 8,
        name: 'Test Payment Systems',
        description: 'Comprehensive test for payment gateway integrations',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 9,
        name: 'Test Search Functionality',
        description: 'Test all aspects of search functionality within the app',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 10,
        name: 'Test File Upload Features',
        description: 'Test file upload capabilities, including profile pictures',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 11,
        name: 'Test Performance Metrics',
        description: 'Test various performance metrics across the system',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 12,
        name: 'Test Security Protocols',
        description: 'Comprehensive security tests for APIs and data protection',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 13,
        name: 'Test Cross-Platform Compatibility',
        description: 'Test the app\'s compatibility across different OS versions',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 14,
        name: 'Test Localization',
        description: 'Test the system for proper localization and internationalization',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testplan_id: 15,
        name: 'Test Email Functionality',
        description: 'Test all email functionalities, including verification and notifications',
        release: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_plans', null, {});
  }
};
