import { Router } from "express";
import {register, login} from "../controllers/authController"

const auth = Router();

// Define the /register route
auth.post('/register', register);

// Define the /login route
auth.post('/login', login);

export default auth;