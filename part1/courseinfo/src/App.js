import React from "react";

// Header component
const Header = (props) => {
  const course = props.course;
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

// Content component
const Content = (props) => {
  const section = props.section;
  const exercise_count = props.exercise_count;
  return (
    <>
      <p>
        {section}: {exercise_count}
      </p>
    </>
  );
};

// Total component
const Total = (props) => {
  const total = props.total;
  return <>Number of exercises: {total}</>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content section={part1} exercise_count={exercises1} />
      <Content section={part2} exercise_count={exercises2} />
      <Content section={part3} exercise_count={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
