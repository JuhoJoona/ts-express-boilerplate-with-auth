import { Request, Response } from 'express';
import { User } from '../models/User';
const { generateHash } = require('./bcrypt/hashingService.js');
const { validateUser } = require('./bcrypt/hashingService.js');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
    
        // Validate user input
        if (!email || !password) {
          return res.status(400).json({ message: 'Please provide username, email, and password' });
        }
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          const validate = await validateUser(password, existingUser.password);
    
          // Generate JWT token
          const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, secretKey, { expiresIn: '1h' });
    
          if (validate == true) {
            return res.status(201).json({ message: "succesful login", token: token, userID: existingUser._id, email: existingUser.email, name: existingUser.userName });
          }
          else {
            return res.status(400).json({ message: 'invalid credentials' });
          }
        }
        else {
          return res.status(401).json({ message: 'invalid credentials' });
        }
    
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Extract user data from request body
        const { username, email, password } = req.body;
    
        // Validate user input
        if (!username || !email || !password) {
          return res.status(400).json({ message: 'Please provide username, email, and password' });
        }
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
        }
    
        // Hash the password
        const hashedPassword = generateHash();
    
        // Create a new user instance
        const newUser = new User({
          username,
          email,
          password: hashedPassword
        });
    
        // Save the user to the database
        await newUser.save();
    
        // Send a success response
        return res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
};
