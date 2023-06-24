import express from 'express';
import Database from './Database.js';
import dotenv from 'dotenv';

dotenv.config();
//initialying expres function
const app = express();
app.use(express.json());
Database();
//port
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>hello world </h1>');
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
