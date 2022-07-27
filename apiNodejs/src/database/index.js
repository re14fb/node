const Sequelize = require('sequelize');
const sequelize = new Sequelize('nomedobanco','user','password',{
    dialect: 'sqlite',
    host: './src/database/db.sqlite'
});

module.exports = sequelize;

