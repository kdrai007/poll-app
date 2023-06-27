import express from 'express';
import Router from './routes/pollRoutes.js';
import Database from './Database.js';
import dotenv from 'dotenv';

dotenv.config();
//initialying expres function
const app = express();
app.use(express.json());
Database();
//port
const PORT = 3000;

app.use('/poll', Router);

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
