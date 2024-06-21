import { useState } from "react";

export const CreatePoll = ({ tags, setCreatingPoll }) => {
  const [pollOptions, setPollOptions] = useState({
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: ""
  });
  const [poll, setPoll] = useState({
    question: "",
    options: [],
    tagId: ""
  });
  const [validated, setValidated] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    // Check if the form is valid
    const createdPoll = {
      ...poll,
      options: [
        {
          opt: pollOptions.opt1,
          count: 0
        },
        {
          opt: pollOptions.opt2,
          count: 0
        },
        {
          opt: pollOptions.opt3,
          count: 0
        },
        {
          opt: pollOptions.opt4,
          count: 0
        }
      ]
    };
    try {
      const res = await fetch("http://localhost:3000/api/create-poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(createdPoll)
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCreatingPoll(false)
      window.location.reload();
    }
  }

  function handleOptionChange(e) {
    const { name, value } = e.target;
    setPollOptions({ ...pollOptions, [name]: value });
  }

  return (
    <form
      className="mx-20 mt-5 container needs-validation"
      noValidate
      onSubmit={onSubmit}
    >
      <h2>Create Poll</h2>
      <div className="mb-3 mt-4">
        <label htmlFor="PollQuestion" className="form-label">
          Question
        </label>
        <input
          type="text"
          className="form-control"
          id="PollQuestion"
          value={poll.question}
          onChange={(e) => setPoll({ ...poll, question: e.target.value })}
          placeholder="who's your favorite actor?"
          required
        />
        <div className="invalid-feedback">
          Please enter a question for your poll.
        </div>
      </div>
      {/* Options div */}
      <div>
        <div className="input-group input-group-sm mt-2 ">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            option 1
          </span>
          <input
            name="opt1"
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            value={pollOptions.opt1}
            onChange={(e) => handleOptionChange(e)}
            placeholder="eg, an actor"
            aria-describedby="inputGroup-sizing-sm"
            required
          />
          <div className="invalid-feedback">
            Please enter an option for your poll.
          </div>
        </div>
        <div className="input-group input-group-sm mt-2 ">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            option 2
          </span>
          <input
            name="opt2"
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            value={pollOptions.opt2}
            onChange={(e) => handleOptionChange(e)}
            placeholder="eg, an actor"
            aria-describedby="inputGroup-sizing-sm"
            required
          />
          <div className="invalid-feedback">
            Please enter an option for your poll.
          </div>
        </div>
        <div className="input-group input-group-sm mt-2 ">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            option 3
          </span>
          <input
            name="opt3"
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            value={pollOptions.opt3}
            onChange={(e) => handleOptionChange(e)}
            placeholder="eg, an actor"
            aria-describedby="inputGroup-sizing-sm"
            required
          />
          <div className="invalid-feedback">
            Please enter an option for your poll.
          </div>
        </div>
        <div className="input-group input-group-sm mt-2 ">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            option 4
          </span>
          <input
            name="opt4"
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            value={pollOptions.opt4}
            onChange={(e) => handleOptionChange(e)}
            placeholder="eg, an actor"
            aria-describedby="inputGroup-sizing-sm"
            required
          />
          <div className="invalid-feedback">
            Please enter an option for your poll.
          </div>
        </div>
      </div>
      {/* Tag select */}
      <select
        className="form-select mt-4"
        aria-label="Default select example"
        onChange={(e) => setPoll({ ...poll, tagId: e.target.value })}
      >
        <option defaultValue="0" value="0">
          Select Tag
        </option>
        {tags.map((tag) => (
          <option key={"" + tag._id + tag.tag} value={tag._id}>
            {tag.tag}
          </option>
        ))}
      </select>
      <button className="btn btn-primary mt-4" >submit</button>
    </form>
  );
};
