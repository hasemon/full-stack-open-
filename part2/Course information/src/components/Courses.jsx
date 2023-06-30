/* eslint-disable react/prop-types */

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, exercise }) => (
  <p>
    {part} {exercise}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.map((part) => part.exercises).reduce((sum, exercise) => sum + exercise, 0);
  return (
    <>
      <h3>total of {total} exercises</h3>
    </>
  );
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};

export default Course;