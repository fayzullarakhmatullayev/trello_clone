import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // You'll need to install bcryptjs for password hashing
import User from '../user/user.model';
import { generateToken } from '../../helpers';

// Register controller
export const register = async (req: Request, res: Response) => {
  try {
    // Extract user data from request body
    const { firstName, lastName, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Generate a token for the new user
    const token = await generateToken(newUser.dataValues.id);

    const {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail
    } = newUser.dataValues;

    // Send the token in the response
    res.status(201).json({
      token,
      user: { firstName: userFirstName, lastName: userLastName, email: userEmail }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token for the authenticated user
    const token = await generateToken(user.dataValues.id);
    const { firstName, lastName, email: userEmail } = user.dataValues;
    // Send the token in the response
    res.json({ token, user: { firstName, lastName, email: userEmail } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
