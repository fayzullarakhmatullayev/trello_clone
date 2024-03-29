"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performMigration = exports.dbConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_HOST, {
    dialect: 'postgres',
    logging: false,
    retry: { max: 10 }
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.dbConnection = dbConnection;
const performMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync({ force: false });
        console.log('Migration successful!');
    }
    catch (error) {
        console.error('Error performing migration:', error);
    }
    finally {
        // Close the Sequelize connection
        yield sequelize.close();
    }
});
exports.performMigration = performMigration;
exports.default = sequelize;
