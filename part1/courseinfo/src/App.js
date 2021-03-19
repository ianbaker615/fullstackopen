// TODO 1.2
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
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  );
};

// Part component
const Part = (props) => {
  const part = props.part;
  const exercises = props.exercises;
  return (
    <>
      <p>
        {part}: {exercises}
      </p>
    </>
  );
};

// Total component
const Total = (props) => {
  const total =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;
  return <>Number of exercises: {total}</>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
