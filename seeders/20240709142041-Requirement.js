'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const requirements = [
      {
        requirement_id: 1,
        name: 'User Login',
        description: 'System must support user login via email and social media accounts',
        attachments: null,
        requirement_type_id: 1,
        project_id: 1
      },
      {
        requirement_id: 2,
        name: 'User Registration',
        description: 'System must allow users to register with email and social media',
        attachments: null,
        requirement_type_id: 1,
        project_id: 1
      },
      {
        requirement_id: 3,
        name: 'Password Management',
        description: 'System must support password reset, change, and recovery features',
        attachments: null,
        requirement_type_id: 1,
        project_id: 1
      },
      {
        requirement_id: 4,
        name: 'Responsive UI',
        description: 'System must provide a responsive UI that works on various devices',
        attachments: null,
        requirement_type_id: 2,
        project_id: 1
      },
      {
        requirement_id: 5,
        name: 'User Profile Management',
        description: 'System must allow users to manage their profile information',
        attachments: null,
        requirement_type_id: 1,
        project_id: 1
      },
      {
        requirement_id: 6,
        name: 'Application Stability',
        description: 'System must ensure stability during startup and regular operations',
        attachments: null,
        requirement_type_id: 3,
        project_id: 1
      },
      {
        requirement_id: 7,
        name: 'Notification System',
        description: 'System must send timely notifications to users',
        attachments: null,
        requirement_type_id: 2,
        project_id: 1
      },
      {
        requirement_id: 8,
        name: 'Payment Gateway Integration',
        description: 'System must integrate with popular payment gateways',
        attachments: null,
        requirement_type_id: 1,
        project_id: 1
      },
      {
        requirement_id: 9,
        name: 'Search Functionality',
        description: 'System must provide efficient and accurate search capabilities',
        attachments: null,
        requirement_type_id: 2,
        project_id: 1
      },
      {
        requirement_id: 10,
        name: 'File Upload Feature',
        description: 'System must allow users to upload files, such as profile pictures',
        attachments: null,
        requirement_type_id: 2,
        project_id: 1
      },
      {
        requirement_id: 11,
        name: 'Performance Optimization',
        description: 'System must be optimized for high performance',
        attachments: null,
        requirement_type_id: 3,
        project_id: 1
      },
      {
        requirement_id: 12,
        name: 'API Security',
        description: 'System must secure APIs against vulnerabilities',
        attachments: null,
        requirement_type_id: 3,
        project_id: 1
      },
      {
        requirement_id: 13,
        name: 'Cross-Platform Compatibility',
        description: 'System must be compatible with multiple operating systems and devices',
        attachments: null,
        requirement_type_id: 2,
        project_id: 1
      },
      {
        requirement_id: 14,
        name: 'Localization Support',
        description: 'System must support multiple languages and localization',
        attachments: null,
        requirement_type_id: 2,
        project_id: 1
      },
      {
        requirement_id: 15,
        name: 'Email Functionality',
        description: 'System must support sending verification and notification emails',
        attachments: null,
        requirement_type_id: 2,
        project_id: 1
      }
    ];

    requirements.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('requirements', requirements, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requirements', null, {});
  }
};
