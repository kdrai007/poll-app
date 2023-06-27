import express from 'express';
import {
  createPoll,
  createOptions,
  deleteQuestion,
  addVote,
  getPoll,
} from '../controllers/poll.js';

const Router = express.Router();

Router.get('/:id', getPoll);
Router.post('/create', createPoll);
Router.put('/options/:id/create', createOptions);
Router.delete('/:id/delete', deleteQuestion);
Router.post('/options/:optionId/add_vote', addVote);

export default Router;
