'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'userId'
      });

      User.hasMany(models.Order, {
        as: 'order',
        foreignKey: 'userId'
      });

      User.hasOne(models.Cart,
        {
          as: 'cart',
          foreignKey: 'userId'
        }
      )
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};