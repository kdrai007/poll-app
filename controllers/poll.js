import Poll from '../model/pollModel.js';
import { Option } from '../model/pollModel.js';
import { generateRandomUUID } from '../utils/helper.js';

//Create a mongodb Poll
export const createPoll = async (req, res) => {
  const { question } = req.body;
  try {
    const newQuest = new Poll({
      question,
    });
    await newQuest.save();
    res.status(200).json({ success: true, poll: newQuest });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

//Create Options;
export const createOptions = async (req, res) => {
  const { id } = req.params;
  const { option } = req.body;
  try {
    const poll = await Poll.findById(id);
    if (!poll)
      return res.status(401).json({ success: false, error: 'invalid id' });
    const optionId = generateRandomUUID();
    const newOption = new Option({
      questionId: id,
      text: option,
      _id: optionId,
      voteLink: `http://localhost:3000/poll/options/${optionId.toLowerCase()}/add_vote`,
    });
    poll.options = [...poll.options, newOption];
    await newOption.save();
    await poll.save();
    res
      .status(200)
      .json({ success: true, optionId, message: 'added new poll option' });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//delete a mongodb document
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const poll = await Poll.findById(id);
    if (!poll)
      return res
        .status(401)
        .json({ success: false, error: 'No poll with this ID' });

    const pollSize = poll.options.length;
    let flag = false;

    if (pollSize > 0) {
      poll.options.forEach((q) => {
        if (q.votes > 0) {
          flag = true;
        }
      });
    }
    if (flag)
      return res
        .status(401)
        .json({ success: false, error: "Can't delete poll! Invalid request" });
    await Option.deleteMany({ questionId: id });
    await Poll.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Poll deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const addVote = async (req, res) => {
  const { optionId } = req.params;
  const pollOption = await Option.findOne({ _id: optionId });

  if (!pollOption) {
    return res.status(404).json({
      success: false,
      error: 'No option is found with the provided id',
    });
  }

  const poll = await Poll.findById(pollOption.questionId);

  if (!poll) {
    return res.status(404).json({
      success: false,
      error: 'No question is found',
    });
  }

  const incrementVote = pollOption.votes + 1;

  // Update the votes for the selected option
  pollOption.votes = incrementVote;
  await pollOption.save();

  // Update the votes in the poll options array
  const updatedOptions = poll.options.map((p) => {
    if (p._id.toString() === optionId) {
      return {
        ...p,
        votes: incrementVote,
      };
    }
    return p;
  });
  // Update the options array in the poll document
  poll.options = updatedOptions;
  await poll.save();
  res.json({ pollOption });
};

export const getPoll = async (req, res) => {
  const { id } = req.params;
  const poll = await Poll.findById(id);
  if (!poll)
    return res
      .status(404)
      .json({ success: false, error: 'no poll found with this id' });
  res.status(200).json({ success: true, poll });
};
