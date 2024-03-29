"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../libs/sequelize"));
const card_model_1 = __importDefault(require("../card/card.model"));
const User = sequelize_2.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
User.hasMany(card_model_1.default, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false,
        name: 'user_id'
    }
});
exports.default = User;
