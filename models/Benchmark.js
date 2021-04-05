const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Benchmark extends Model {}

Benchmark.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        boulder_grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 16,
                min: 0
            }
        },
        route_grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
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
        modelName: 'benchmark'
    }
);

module.exports = Benchmark