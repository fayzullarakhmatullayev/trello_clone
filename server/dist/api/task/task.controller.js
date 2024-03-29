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
exports.updateTaskPosition = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const task_model_1 = __importDefault(require("./task.model"));
// Controller to create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { card_id, text, position } = req.body;
        // Create a new task
        const newTask = yield task_model_1.default.create({
            card_id,
            text,
            position
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createTask = createTask;
// Controller to update a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.task_id;
        const { text } = req.body;
        // Find the task by task_id
        const task = yield task_model_1.default.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        // Update the task text
        // @ts-ignore
        task.text = text;
        yield task.save();
        res.json({ message: 'Task updated successfully' });
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateTask = updateTask;
// Controller to delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.task_id;
        // Find the task by task_id and delete it
        const deletedTask = yield task_model_1.default.destroy({ where: { task_id } });
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteTask = deleteTask;
const updateTaskPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskPositions } = req.body;
        // Update the order of tasks in the database
        yield Promise.all(taskPositions.map((taskInfo) => __awaiter(void 0, void 0, void 0, function* () {
            const { task_id, position, card_id } = taskInfo;
            const task = yield task_model_1.default.findByPk(task_id);
            if (task) {
                // @ts-ignore
                task.position = position;
                // @ts-ignore
                task.card_id = card_id;
                yield task.save();
            }
        })));
        res.json({ message: 'Task order updated successfully' });
    }
    catch (error) {
        console.error('Error updating task order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateTaskPosition = updateTaskPosition;
