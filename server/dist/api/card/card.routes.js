"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const card_controller_1 = require("./card.controller");
const router = (0, express_1.Router)();
router.post('/', auth_1.default, card_controller_1.createCard);
router.get('/', auth_1.default, card_controller_1.getAllCards);
router.get('/:card_id', auth_1.default, card_controller_1.getCardById);
router.put('/:card_id', auth_1.default, card_controller_1.updateCard);
router.delete('/:card_id', auth_1.default, card_controller_1.deleteCard);
router.post('/update-position', auth_1.default, card_controller_1.updateCardPosition);
exports.default = router;
