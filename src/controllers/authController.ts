import { Request, Response } from 'express';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    return res.status(200).json({ message: 'Login successful' });
};

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    return res.status(200).json({ message: 'Registration successful' });
};
