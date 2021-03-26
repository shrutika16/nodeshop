const Sequelize = require('sequelize');

const sequalize = require('../util/database');

const orderItem = sequalize.define(
  'orderItem',
  {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      quantity : Sequelize.INTEGER
  }
)

module.exports = orderItem;