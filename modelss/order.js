const Sequelize = require('sequelize');

const sequalize = require('../util/database');

const Order = sequalize.define(
    'order',
    {
        id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       },
    }
)

module.exports = Order;