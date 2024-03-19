import { Request, Response } from 'express';
import Card from './card.model';
import Task from '../task/task.model';

// Controller to create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const { user_id } = req;
    const { title } = req.body;

    // Create a new card associated with the user_id
    const newCard = await Card.create({
      user_id,
      title
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all cards belonging to the authenticated user
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const { user_id } = req;

    // Retrieve all cards associated with the user_id
    const cards = await Card.findAll({ where: { user_id }, include: [Task] });

    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCardById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req;
    const card_id = req.params.card_id;

    // Find the card by card_id and user_id
    const card = await Card.findOne({ where: { card_id, user_id }, include: [Task] });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const { user_id } = req;
    const card_id = req.params.card_id;
    const { title } = req.body;

    // Find the card by card_id and user_id
    const card = await Card.findOne({ where: { card_id, user_id }, include: [Task] });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Update the card title
    card.dataValues.title = title;
    await card.save();

    res.json(card);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a card belonging to the authenticated user
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { user_id } = req;
    const card_id = req.params.card_id;

    // Find the card by card_id and user_id and delete it
    const deletedCard = await Card.destroy({ where: { card_id, user_id } });

    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
