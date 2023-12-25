// migrations/YYYYMMDDHHMMSS-add_first_last_name_to_users.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'title', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'middle_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'designation', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'working_since', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'title');
    await queryInterface.removeColumn('Users', 'first_name');
    await queryInterface.removeColumn('Users', 'middle_name');
    await queryInterface.removeColumn('Users', 'last_name');
    await queryInterface.removeColumn('Users', 'designation');
    await queryInterface.removeColumn('Users', 'working_since');
  },
};
