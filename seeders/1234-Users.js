'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { user_id: 1, name: 'Bao Ninh', email: 'nqbao@gmail.com', password: '$2b$10$F0Xmo01NcJjn51s/MXQx8e7PwCSrRhhq8vOp3D8Es95re3k8Exeei', avt_link: null , createdAt: new Date(), updatedAt: new Date()},
      { user_id: 2, name: 'Nghi Do', email: 'dtnghi@gmail.com', password: '$2b$10$NBkPh72NjecRo6wfoV41qerV53j4y7D7ksgw4hWZh//R06Qv8KuDG', avt_link: null , createdAt: new Date(), updatedAt: new Date()},
      { user_id: 3, name: 'Nghia Ngo', email: 'ndnghia@gmail.com', password: '$2b$10$11E/fFKs54S2gzYrw4rer.RmT5JEflu2SFk/onSXqyPkDiJ1vbENC', avt_link: null , createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
