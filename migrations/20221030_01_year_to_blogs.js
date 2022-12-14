const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1991,
      max: 2022,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("year", "blogs");
  },
};
