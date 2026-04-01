const { DataTypes } = require("sequelize");
const { sequelize } = require("./User");

const Drink = sequelize.define(
    "Drink",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cafe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cafeAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "",
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "drinks",
        timestamps: true,
    }
);

module.exports = { Drink };