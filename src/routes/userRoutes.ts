
import * as express from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/Auth.controller";


const Router = express.Router();

Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);

export { Router as AuthRoutes };