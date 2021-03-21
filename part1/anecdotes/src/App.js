import React, { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  // zero-filled array w length of anecdotes array
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0)
  );

  const handleVote = () => {
    const vote_copy = [...votes];
    vote_copy[selected] += 1;
    setVotes(vote_copy);
  };

  const handleNext = () => {
    console.log("handlenext invoked");
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="next anecdote" selected={selected} />
    </>
  );
};

export default App;
