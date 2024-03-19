import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
  updateCardPosition
} from './card.controller';

const router = Router();

router.post('/', authMiddleware, createCard);
router.get('/', authMiddleware, getAllCards);
router.get('/:card_id', authMiddleware, getCardById);
router.put('/:card_id', authMiddleware, updateCard);
router.delete('/:card_id', authMiddleware, deleteCard);
router.put('/update-position', authMiddleware, updateCardPosition);

export default router;
