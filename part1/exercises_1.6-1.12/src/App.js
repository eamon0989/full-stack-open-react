import React, { useState } from 'react'

const Header = ({ headerValue }) => {
  return (
    <>
      <h1>{ headerValue }</h1>
    </>
  )
}

const Button = ({ value, callback }) => {
  return (
    <>
      <button onClick={callback}>{ value }</button>
    </>
  )
}

const StatisticLine = ({ value, state }) => {
  return (
    <>
      <tr><td>{value}</td><td>{state}</td></tr>
    </>
  )
}

// a proper place to define a component
const Statistics = (props) => {
  if (props.value.all === 0) {
    return (
      <table>
        <tbody>
          <StatisticLine value='good ' state ={props.value.good} />
          <StatisticLine value='neutral ' state ={props.value.neutral} />
          <StatisticLine value='bad ' state ={props.value.bad} />
          <StatisticLine value='No feedback given ' />
        </tbody>
      </table>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine value='good ' state ={props.value.good} />
        <StatisticLine value='neutral ' state ={props.value.neutral} />
        <StatisticLine value='bad ' state ={props.value.bad} />
        <StatisticLine value='all ' state={props.value.all} />
        <StatisticLine value='average ' state={props.value.average} />
        <StatisticLine value='positive ' state={props.value.positive + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = (good + bad + neutral / 3).toFixed(1)
  const positive = ((good / all) * 100).toFixed(1) || 0
  let props = {
    good: good,
    neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  }

  return (
    <div>
      <Header headerValue='give feedback' />
      <Button value='good' callback={() => setGood(good + 1)} />
      <Button value='neutral' callback={() => setNeutral(neutral + 1)} />
      <Button value='bad' callback={() => setBad(bad + 1)} />
      <Header headerValue='statistics' />
      <Statistics value={props} />
    </div>
  )
}

export default App