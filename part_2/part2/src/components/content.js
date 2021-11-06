const H2 =  ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
  return(
    <p><b>Number of exercises {sum}</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(ele => <Part key={ele.id} part={ele} />)}
    </div>
  )
}

export const Course = ({ course }) => {
  return (
    <>
    <H2 name={course.name}/>
    <Content parts ={course.parts}/>
    <Total parts ={course.parts}/>
    </>
  )
}