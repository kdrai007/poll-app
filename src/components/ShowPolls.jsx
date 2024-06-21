import { useState } from "react";
import { Polls } from "./Polls";

export const ShowPolls = ({ polls, setReloadPolls }) => {
  if (polls.length === 0) {
    return null;
  }
  const [currentPollIndex, setCurrentPollIndex] = useState(0);
  const pollSize = polls.length;
  function handlePrev() {
    if (currentPollIndex === 0) {
      setCurrentPollIndex(pollSize - 1);
    } else {
      setCurrentPollIndex(currentPollIndex - 1)
    }
  }
  function handleNext() {
    if (currentPollIndex === pollSize - 1) {
      setCurrentPollIndex(0)
    } else {
      setCurrentPollIndex(currentPollIndex + 1)
    }
  }
  return <div className="mx-20 mt-10 container poll-container">
    <Polls poll={polls[currentPollIndex]} setReloadPolls={setReloadPolls} />
    <div className="d-flex gap-2 flex-row-reverse">
      <button className="btn btn-primary" onClick={handleNext}>next</button>
      <button className="btn btn-dark" onClick={handlePrev}>prev</button>
    </div>
  </div>
}
