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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // You'll need to install bcryptjs for password hashing
const user_model_1 = __importDefault(require("../user/user.model"));
const helpers_1 = require("../../helpers");
// Register controller
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user data from request body
        const { firstName, lastName, email, password } = req.body;
        // Check if the email is already registered
        const existingUser = yield user_model_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create a new user in the database
        const newUser = yield user_model_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        // Generate a token for the new user
        const token = yield (0, helpers_1.generateToken)(newUser.dataValues.id);
        const { firstName: userFirstName, lastName: userLastName, email: userEmail } = newUser.dataValues;
        // Send the token in the response
        res.status(201).json({
            token,
            user: { firstName: userFirstName, lastName: userLastName, email: userEmail }
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.register = register;
// Login controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;
        // Find the user by email
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.dataValues.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Generate a token for the authenticated user
        const token = yield (0, helpers_1.generateToken)(user.dataValues.id);
        const { firstName, lastName, email: userEmail } = user.dataValues;
        // Send the token in the response
        res.json({ token, user: { firstName, lastName, email: userEmail } });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.login = login;
