import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { UserResponce } from "../dto/user.dto";


dotenv.config();
const { SECRET_KEY = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: UserResponce) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  }
}