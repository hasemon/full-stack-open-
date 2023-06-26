/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
);

const Statistics = ({ title, goodState, neutralState, badState, total , average, percentage}) => {
  return (
    <div>
      <h1>{title}</h1>
      <table>
        <StatisticLine text="Good" value={goodState} />
        <StatisticLine text="Neutral" value={neutralState} />
        <StatisticLine text="Bad" value={badState} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={percentage} />
      </table>
    </div>
  );
}



function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = (good + neutral + bad)
  const average = ((good * 1 + neutral * 0 + bad * -1) / total)
  const percentage = ((good / total) * 100)

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          title="Statistics"
          goodState={good}
          neutralState={neutral}
          badState={bad}
          total={total}
          average={average}
          percentage={percentage}
        />
      )}
    </>
  );
}

export default App;
