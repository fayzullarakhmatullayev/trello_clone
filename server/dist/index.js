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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const sequelize_1 = require("./libs/sequelize");
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const card_routes_1 = __importDefault(require("./api/card/card.routes"));
const task_routes_1 = __importDefault(require("./api/task/task.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000 || process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/api', (req, res) => {
    res.json({ success: true });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/card', card_routes_1.default);
app.use('/api/task', task_routes_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sequelize_1.dbConnection)();
        console.log(`App is running on ${process.env.APP_DOMAIN}:${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
}));
