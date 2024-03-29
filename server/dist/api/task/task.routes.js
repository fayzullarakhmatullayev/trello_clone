"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const task_controller_1 = require("./task.controller");
const router = (0, express_1.Router)();
router.post('/', auth_1.default, task_controller_1.createTask);
router.put('/:task_id', auth_1.default, task_controller_1.updateTask);
router.delete('/:task_id', auth_1.default, task_controller_1.deleteTask);
router.post('/update-position', auth_1.default, task_controller_1.updateTaskPosition);
exports.default = router;
