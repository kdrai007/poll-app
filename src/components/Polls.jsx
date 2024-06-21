import { useState } from "react"

export const Polls = ({ poll, setReloadPolls }) => {
  const [selectedPoll, setSelectPoll] = useState(null);
  async function handleClick(optId, count) {
    if (selectedPoll === optId) return;
    setSelectPoll(optId);
    const updateCount = count + 1;
    try {
      await fetch("http://localhost:3000/api/polls/vote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId: poll._id,
          optId,
          count: updateCount
        })
      })
      setReloadPolls(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  }
  return <div className="">
    <p className="my-2 text-xl"><strong>Q- </strong>{poll.question}</p>
    <div className="options">
      {poll.options.map((option) => <div className={`${selectedPoll === option.optId ? "selected" : ""}`} key={option.optId} onClick={() => handleClick(option.optId, option.count)}>
        <p className="">{option.opt}</p>
      </div>)}
    </div>
  </div>
}
