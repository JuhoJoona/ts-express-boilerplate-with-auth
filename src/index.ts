import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { User } from './models/user';
import { AppDataSource } from './dataSource';
import { AuthRoutes } from './routes/userRoutes';



dotenv.config();

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

app.use('/auth', AuthRoutes)






app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
