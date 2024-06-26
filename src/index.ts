import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { User } from './models/user';
import { AppDataSource } from './dataSource';
import { AuthRoutes } from './routes/userRoutes';
import { authentification } from './middlewares/authMiddleware';
import { authorization } from './middlewares/AuthorizationMiddleware';
import { UserController } from './controllers/UserController';



dotenv.config();

AppDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!");
})
.catch((error) => console.log("Error during Data Source initialization", error));

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors())

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres' })
})

app.use('/auth', AuthRoutes)

app.get(
  "/users",
  authentification,
  authorization(["user"]),
  UserController.getUsers
);

app.post('/users/update', authentification, UserController.updateUser);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
