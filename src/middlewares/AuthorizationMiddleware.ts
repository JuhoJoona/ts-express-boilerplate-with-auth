import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../models/user";


export const authorization = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({where: {id: req["currentUser"].id}});
        if(!roles.includes(user!.role))
        {
            return res.status(403).json({message: "forbidden"});
        }

        next();

    }
}

