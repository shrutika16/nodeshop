const Sequelize = require('sequelize');

const sequalize = require('../util/database');

const Cart = sequalize.define(
  'cartItem',
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

module.exports = Cart;