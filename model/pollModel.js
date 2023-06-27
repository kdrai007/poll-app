import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const optionSchema = new Schema({
  questionId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  voteLink: {
    type: String,
    required: true,
  },
});

const pollSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});
export const Option = mongoose.model('Option', optionSchema);
const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
