'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User,
        {
          as: 'user',
          foreignKey: 'userId',
          constraints: true,
          onDelete: 'CASCADE'
        });
      
      Product.belongsToMany(models.Order,
        {
          through: models.orderItem,
          as: 'orderItems',
          foreignKey: 'productId'
        });
      
      Product.belongsToMany(models.Cart,
        {
          through: models.cartItem,
          as: 'cartItems',
          foreignKey: 'productId'
        })
    }
  };
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};