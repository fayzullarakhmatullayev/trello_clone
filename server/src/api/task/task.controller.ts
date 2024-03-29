import { Request, Response } from 'express';
import Task from './task.model';

interface ITaskInfo {
  task_id: number | string;
  card_id: number | string;
  position: number | string;
}

// Controller to create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { card_id, text, position } = req.body;

    // Create a new task
    const newTask = await Task.create({
      card_id,
      text,
      position
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task_id = req.params.task_id;
    const { text } = req.body;

    // Find the task by task_id
    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task text
    // @ts-ignore
    task.text = text;
    await task.save();

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task_id = req.params.task_id;

    // Find the task by task_id and delete it
    const deletedTask = await Task.destroy({ where: { task_id } });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTaskPosition = async (req: Request, res: Response) => {
  try {
    const { taskPositions } = req.body;

    // Update the order of tasks in the database
    await Promise.all(
      taskPositions.map(async (taskInfo: ITaskInfo) => {
        const { task_id, position, card_id } = taskInfo;
        const task = await Task.findByPk(task_id);
        if (task) {
          // @ts-ignore
          task.position = position;
          // @ts-ignore
          task.card_id = card_id;
          await task.save();
        }
      })
    );

    res.json({ message: 'Task order updated successfully' });
  } catch (error) {
    console.error('Error updating task order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
