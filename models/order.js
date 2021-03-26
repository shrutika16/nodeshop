'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User,
        {
          as: 'users',
          foreignKey: 'userId'
        });
      
      Order.belongsToMany(models.Product,
      {
        through: models.orderItem,
        as: "orderItems",
        foreignKey: 'orderId'
      })
    }
  };
  Order.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};