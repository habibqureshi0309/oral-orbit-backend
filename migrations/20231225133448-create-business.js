// migrations/YYYYMMDDHHMMSS-create-business.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Businesses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      experience: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      license_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_dentists: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_dentists: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_hygienists: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_dental_assistants: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_administrative_staff: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_size: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      clinic_area: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emergency_service_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emergency_service_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      health_record_system: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      health_record_system_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_instagram: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_linkedin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_facebook: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_youtube: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_tiktok: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Businesses');
  },
};
