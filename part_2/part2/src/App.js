import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  const { name, exercises } = props.part;

    // console.log(props);

  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts.parts[0] } />
      <Part part={props.parts.parts[1] } />
      <Part part={props.parts.parts[2] } />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App