const Sequalize = require('sequelize');

const sequalize = new Sequalize(
    'node-complete',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequalize;