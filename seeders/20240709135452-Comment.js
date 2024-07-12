'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [
      { comment_id: 1, issue_id: 1, user_id: 1, content: 'I encountered the same login issue.', created_date: '2024-05-01 10:00:00' },
      { comment_id: 2, issue_id: 2, user_id: 2, content: 'Image upload error is very frequent.', created_date: '2024-05-02 11:20:00' },
      { comment_id: 3, issue_id: 3, user_id: 3, content: 'Profile update issue needs attention.', created_date: '2024-05-03 12:35:00' },
      { comment_id: 4, issue_id: 4, user_id: 1, content: 'Notification bug persists.', created_date: '2024-05-04 13:50:00' },
      { comment_id: 5, issue_id: 5, user_id: 2, content: 'Broken link on homepage. Please fix.', created_date: '2024-05-05 14:05:00' },
      { comment_id: 6, issue_id: 6, user_id: 3, content: 'App is very slow to load.', created_date: '2024-05-06 15:20:00' },
      { comment_id: 7, issue_id: 7, user_id: 1, content: 'User counts are still incorrect.', created_date: '2024-05-07 16:35:00' },
      { comment_id: 8, issue_id: 8, user_id: 2, content: 'Error in chat feature needs fixing.', created_date: '2024-05-08 17:50:00' },
      { comment_id: 9, issue_id: 9, user_id: 3, content: 'Search results are not accurate.', created_date: '2024-05-09 18:05:00' },
      { comment_id: 10, issue_id: 10, user_id: 1, content: 'Password reset emails not received.', created_date: '2024-05-10 19:20:00' },
      { comment_id: 11, issue_id: 11, user_id: 2, content: 'Comments are not saving.', created_date: '2024-05-11 20:35:00' },
      { comment_id: 12, issue_id: 12, user_id: 3, content: 'Video uploads fail consistently.', created_date: '2024-05-12 21:50:00' },
      { comment_id: 13, issue_id: 13, user_id: 1, content: 'User tagging does not work.', created_date: '2024-05-13 22:05:00' },
      { comment_id: 14, issue_id: 14, user_id: 2, content: 'Follower counts are incorrect.', created_date: '2024-05-14 23:20:00' },
      { comment_id: 15, issue_id: 15, user_id: 3, content: 'Message delivery is delayed.', created_date: '2024-05-15 08:35:00' },
      { comment_id: 16, issue_id: 1, user_id: 2, content: 'Still facing login issues.', created_date: '2024-05-02 09:45:00' },
      { comment_id: 17, issue_id: 2, user_id: 3, content: 'Image upload problem is annoying.', created_date: '2024-05-03 10:50:00' },
      { comment_id: 18, issue_id: 3, user_id: 1, content: 'Profile update bug is frustrating.', created_date: '2024-05-04 11:55:00' },
      { comment_id: 19, issue_id: 4, user_id: 2, content: 'Notifications not working again.', created_date: '2024-05-05 13:00:00' },
      { comment_id: 20, issue_id: 5, user_id: 3, content: 'Homepage link still broken.', created_date: '2024-05-06 14:05:00' },
      { comment_id: 21, issue_id: 6, user_id: 1, content: 'Loading times are terrible.', created_date: '2024-05-07 15:10:00' },
      { comment_id: 22, issue_id: 7, user_id: 2, content: 'Incorrect user counts issue remains.', created_date: '2024-05-08 16:15:00' },
      { comment_id: 23, issue_id: 8, user_id: 3, content: 'Chat feature errors persist.', created_date: '2024-05-09 17:20:00' },
      { comment_id: 24, issue_id: 9, user_id: 1, content: 'Search function still glitchy.', created_date: '2024-05-10 18:25:00' },
      { comment_id: 25, issue_id: 10, user_id: 2, content: 'Reset emails not coming through.', created_date: '2024-05-11 19:30:00' },
      { comment_id: 26, issue_id: 11, user_id: 3, content: 'Can\'t save comments on posts.', created_date: '2024-05-12 20:35:00' },
      { comment_id: 27, issue_id: 12, user_id: 1, content: 'Video upload feature is broken.', created_date: '2024-05-13 21:40:00' },
      { comment_id: 28, issue_id: 13, user_id: 2, content: 'Tagging users not functioning.', created_date: '2024-05-14 22:45:00' },
      { comment_id: 29, issue_id: 14, user_id: 3, content: 'Wrong follower counts displayed.', created_date: '2024-05-15 23:50:00' },
      { comment_id: 30, issue_id: 15, user_id: 1, content: 'Message delays are unacceptable.', created_date: '2024-05-16 08:55:00' }
    ];

    comments.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });


    await queryInterface.bulkInsert('comment', comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comment', null, {});
  }
};
