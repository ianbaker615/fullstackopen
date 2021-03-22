import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);
  // one-liner
  // const sum = course.parts.reduce((total, part) => total + part.exercises, 0);
  return <p>Number of exercises {sum}</p>;
};

export default Course;
