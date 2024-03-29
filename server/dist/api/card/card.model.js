"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../libs/sequelize"));
const task_model_1 = __importDefault(require("../task/task.model"));
const Card = sequelize_2.default.define('card', {
    card_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
Card.hasMany(task_model_1.default, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false,
        name: 'card_id'
    }
});
exports.default = Card;
