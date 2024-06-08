import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { User } from './models/user';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!");
      // Here you can start to work with your entities
  })
  .catch((error) => console.log("Error during Data Source initialization", error));

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})






app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
