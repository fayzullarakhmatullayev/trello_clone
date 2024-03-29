"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../libs/sequelize"));
const Task = sequelize_2.default.define('task', {
    task_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    card_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
exports.default = Task;
