'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const issues = [
      {
        issue_id: 1,
        title: 'Login fails',
        priority_id: 1,
        status_id: 7,
        test_case_id: 28,
        test_run_id: 3,
        description: 'Users cannot log in using the correct password',
        created_date: '2024-05-01 9:30:00',
        created_by: 1,
        project_id: 1,
        assigned_to: 1
      },
      {
        issue_id: 2,
        title: 'Image upload error',
        priority_id: 2,
        status_id: 11,
        test_case_id: 26,
        test_run_id: 2,
        description: 'Error occurs when uploading images',
        created_date: '2024-05-02 10:15:00',
        created_by: 3,
        project_id: 1,
        assigned_to: 3
      },
      {
        issue_id: 3,
        title: 'Profile update fails',
        priority_id: 3,
        status_id: 5,
        test_case_id: 19,
        test_run_id: 1,
        description: 'Users cannot update their profile information',
        created_date: '2024-05-03 11:00:00',
        created_by: 2,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 4,
        title: 'Notification bug',
        priority_id: 2,
        status_id: 4,
        test_case_id: 21,
        test_run_id: 3,
        description: 'Notifications are not being sent',
        created_date: '2024-05-04 12:45:00',
        created_by: 2,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 5,
        title: 'Broken link on homepage',
        priority_id: 1,
        status_id: 6,
        test_case_id: 18,
        test_run_id: 1,
        description: 'Link on the homepage is broken',
        created_date: '2024-05-05 13:30:00',
        created_by: 1,
        project_id: 1,
        assigned_to: 1
      },
      {
        issue_id: 6,
        title: 'Slow loading times',
        priority_id: 2,
        status_id: 9,
        test_case_id: 23,
        test_run_id: 1,
        description: 'The app has slow loading times',
        created_date: '2024-05-06 14:15:00',
        created_by: 3,
        project_id: 1,
        assigned_to: 3
      },
      {
        issue_id: 7,
        title: 'Incorrect user counts',
        priority_id: 3,
        status_id: 2,
        test_case_id: 2,
        test_run_id: 3,
        description: 'User counts are displayed incorrectly',
        created_date: '2024-05-07 15:00:00',
        created_by: 2,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 8,
        title: 'Error in chat feature',
        priority_id: 1,
        status_id: 8,
        test_case_id: 27,
        test_run_id: 2,
        description: 'Chat feature is causing errors',
        created_date: '2024-05-08 15:45:00',
        created_by: 2,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 9,
        title: 'Search function glitch',
        priority_id: 2,
        status_id: 10,
        test_case_id: 9,
        test_run_id: 2,
        description: 'Search function does not return correct results',
        created_date: '2024-05-09 16:30:00',
        created_by: 1,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 10,
        title: 'Password reset issue',
        priority_id: 3,
        status_id: 3,
        test_case_id: 7,
        test_run_id: 1,
        description: 'Password reset emails not being sent',
        created_date: '2024-05-10 17:15:00',
        created_by: 3,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 11,
        title: 'Comment section bug',
        priority_id: 1,
        status_id: 1,
        test_case_id: 10,
        test_run_id: 3,
        description: 'Comments are not being saved',
        created_date: '2024-05-11 18:00:00',
        created_by: 2,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 12,
        title: 'Video upload fails',
        priority_id: 2,
        status_id: 2,
        test_case_id: 17,
        test_run_id: 2,
        description: 'Users cannot upload videos',
        created_date: '2024-05-12 18:45:00',
        created_by: 3,
        project_id: 1,
        assigned_to: 2
      },
      {
        issue_id: 13,
        title: 'User tagging issue',
        priority_id: 3,
        status_id: 1,
        test_case_id: 6,
        test_run_id: 2,
        description: 'User tagging in posts is not working',
        created_date: '2024-05-13 19:30:00',
        created_by: 2,
        project_id: 1,
        assigned_to: 1
      },
      {
        issue_id: 14,
        title: 'Follower count error',
        priority_id: 1,
        status_id: 6,
        test_case_id: 1,
        test_run_id: 1,
        description: 'Follower counts are incorrect',
        created_date: '2024-05-14 20:15:00',
        created_by: 1,
        project_id: 1,
        assigned_to: 3
      },
      {
        issue_id: 15,
        title: 'Message delivery delay',
        priority_id: 2,
        status_id: 7,
        test_case_id: 22,
        test_run_id: 3,
        description: 'Messages are delivered with delays',
        created_date: '2024-05-15 21:00:00',
        created_by: 3,
        project_id: 1,
        assigned_to: 2
      }
    ];

    issues.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert('issues', issues, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('issues', null, {});
  }
};
