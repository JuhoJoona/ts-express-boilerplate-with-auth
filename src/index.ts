import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import auth from './routes/authRoutes';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/database';

mongoose.connect(dbUrl)
  .then(() => console.log('🛢️  MongoDB connected'))
  .catch(err => console.error('⚠️  Failed to connect to MongoDB:', err));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
