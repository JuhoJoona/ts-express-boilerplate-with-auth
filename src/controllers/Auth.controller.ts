import { Request, Response } from "express";
import { User } from "../models/user";
import { AppDataSource } from "../dataSource";
import { encrypt } from "../bcrypt/encrypt";



export class AuthController {
    static async login(req: Request, res: Response)
    {
        try {
            const {email, password} = req.body;
            if(!email || !password)
            {
                return res.status(500).json({message: "Email and password are required"});
            }

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({where: {email}})

            const isPasswordValid = encrypt.comparepassword(user!.password, password);

            if(!user || !isPasswordValid)
            {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            
            const token = encrypt.generateToken({ id: user.id });

            return res.status(200).json({ message: "Login successful", user, token });

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}