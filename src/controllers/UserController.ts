import { Request, Response } from "express";
import { User } from "../models/user";
import { AppDataSource } from "../dataSource";
import { encrypt } from "../bcrypt/encrypt";
import * as cache from "memory-cache";


export class UserController
{
    static async signup(req: Request, res: Response)
    {
        try {
            const {username, email, password} = req.body;
            const encryptedPassword = await encrypt.encryptpass(password);
            const user = new User();
            user.email = email;
            user.name = username;
            user.password = encryptedPassword;
            user.role = "user";


            const userRepo = AppDataSource.getRepository(User);
            await userRepo.save(user);

            const token = encrypt.generateToken({id: user.id});

            return res.status(200).json({message: "User created successfully"});
        } catch (error) {
            return res.status(500)
        }
    }

    static async getUsers(req: Request, res: Response) {
        const data = cache.get("data");
        if (data) {
          console.log("serving from cache");
          return res.status(200).json({
            data,
          });
        } else {
          console.log("serving from db");
          const userRepository = AppDataSource.getRepository(User);
          const users = await userRepository.find();
    
          cache.put("data", users, 6000);
          return res.status(200).json({
            data: users,
          });
        }
      }

    static async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({
          where: { id },
        });
        user!.name = name;
        user!.email = email;
        await userRepo.save(user!);
        res.status(200).json({ message: "updated", user });
      }
    
      static async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
          where: { id },
        });
        await userRepository.remove(user!);
        res.status(200).json({ message: "ok" });
      }


}