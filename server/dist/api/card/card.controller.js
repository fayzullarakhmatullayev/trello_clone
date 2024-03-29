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
exports.updateCardPosition = exports.deleteCard = exports.updateCard = exports.getCardById = exports.getAllCards = exports.createCard = void 0;
const card_model_1 = __importDefault(require("./card.model"));
const task_model_1 = __importDefault(require("../task/task.model"));
// Controller to create a new card
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req;
        const { title, position } = req.body;
        // Create a new card associated with the user_id
        const newCard = yield card_model_1.default.create({
            user_id,
            title,
            position
        });
        res.status(201).json(newCard);
    }
    catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createCard = createCard;
// Controller to get all cards belonging to the authenticated user
const getAllCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req;
        // Retrieve all cards associated with the user_id
        const cards = yield card_model_1.default.findAll({
            where: { user_id },
            include: [task_model_1.default],
            order: [['position', 'ASC']]
        });
        cards.forEach((card) => {
            // @ts-ignore
            card.tasks.sort((a, b) => a.position - b.position);
        });
        res.json(cards);
    }
    catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllCards = getAllCards;
const getCardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req;
        const card_id = req.params.card_id;
        // Find the card by card_id and user_id
        const card = yield card_model_1.default.findOne({
            where: { card_id, user_id },
            include: [task_model_1.default]
        });
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json(card);
    }
    catch (error) {
        console.error('Error fetching card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getCardById = getCardById;
const updateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req;
        const card_id = req.params.card_id;
        const { title } = req.body;
        // Find the card by card_id and user_id
        const card = yield card_model_1.default.findOne({
            where: { card_id, user_id },
            include: [task_model_1.default]
        });
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        // Update the card title
        // @ts-ignore
        card.title = title;
        yield card.save();
        res.json(card);
    }
    catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateCard = updateCard;
// Controller to delete a card belonging to the authenticated user
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req;
        const card_id = req.params.card_id;
        // Find the card by card_id and user_id and delete it
        const deletedCard = yield card_model_1.default.destroy({ where: { card_id, user_id } });
        if (!deletedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteCard = deleteCard;
const updateCardPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardPositions } = req.body;
        yield Promise.all(cardPositions.map((cardInfo) => __awaiter(void 0, void 0, void 0, function* () {
            const { card_id, position } = cardInfo;
            const card = yield card_model_1.default.findByPk(card_id);
            if (card) {
                // @ts-ignore
                card.position = position;
                yield card.save();
            }
        })));
        res.json({ message: 'Card order updated successfully' });
    }
    catch (error) {
        console.error('Error updating card order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateCardPosition = updateCardPosition;
