const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model {}

Workout.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // type of workout
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // time it took to complete workout (in minutes)
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // beginner, intermediate or advanced
        level: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // workout description
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // connect session to user
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        } 
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'workout'
    }
);

module.exports = Workout
  