import bcrypt from 'bcryptjs';

interface IUser{
    id?: string;
    email: string;
    password: string;
}

interface IuserModel {
    createUser(user: IUser): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser | null>;
    comparePassword(inputPassword: string, storedPassword: string): Promise<boolean>;
}


class UserModel implements IuserModel
{
    async createUser(user: IUser): Promise<IUser> {
        user.password = await bcrypt.hash(user.password, 10)

        throw new Error('not implemented');
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        // Find user by email from the database (implementation will vary)
        throw new Error('Method not implemented.');
      }
    
      async comparePassword(inputPassword: string, storedPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, storedPassword);
      }
}