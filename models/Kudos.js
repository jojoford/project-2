const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kudos extends Model {}

Kudos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        workout_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'workout',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'kudos'
    }
)

module.exports = Kudos
