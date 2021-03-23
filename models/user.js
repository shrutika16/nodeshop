const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
}, {
    // timestamps: false,
    tableName: 'user'
});

module.exports = User;
