import React, { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// const Statistic;
const Display = ({ text, statistic }) => (
  <p>
    {text}: {statistic}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <h1>Statistics</h1>
      <Display statistic={good} text="Good" />
      <Display statistic={neutral} text="Neutral" />
      <Display statistic={bad} text="Bad" />
      <Display statistic={good + neutral + bad} text="All" />
      <Display
        statistic={(good - bad) / (good + neutral + bad)}
        text="Average"
      />
      <Display
        statistic={((good / (good + neutral + bad)) * 100).toString() + "%"}
        text="Positive"
      />
    </>
  );
};

export default App;
