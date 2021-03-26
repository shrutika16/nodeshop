const Sequalize = require('sequelize');

const sequalize = new Sequalize(
    'node-complete',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost',
        // logging: false,
    }
);

module.exports = sequalize;