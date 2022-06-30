const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const UserModels = sequelize.define('user',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel:{
        type: DataTypes.STRING,
        allowNull: false
    }    
}, {
    timestamps: false
});

module.exports = UserModels;