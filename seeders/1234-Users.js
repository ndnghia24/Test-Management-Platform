'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { user_id: 1, name: 'Bao Ninh', email: 'nqbao@gmail.com', password: '123456', avt_link: null , createdAt: new Date(), updatedAt: new Date()},
      { user_id: 2, name: 'Nghi Do', email: 'dtnghi@gmail.com', password: '123456', avt_link: null , createdAt: new Date(), updatedAt: new Date()},
      { user_id: 3, name: 'Nghia Ngo', email: 'ndnghia@gmail.com', password: '123456', avt_link: null , createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
