import React, { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// const Statistic;
const Statistic = ({ text, statistic }) => (
  <p>
    {text}: {statistic}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive_percentage =
    ((good / (good + neutral + bad)) * 100).toString() + "%";

  if (total == 0) return <p>No feedback given</p>;
  else {
    return (
      <>
        <Statistic statistic={good} text="Good" />
        <Statistic statistic={neutral} text="Neutral" />
        <Statistic statistic={bad} text="Bad" />
        <Statistic statistic={total} text="Total" />
        <Statistic statistic={average} text="Average" />
        <Statistic statistic={positive_percentage} text="Positive" />
      </>
    );
  }
};

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
