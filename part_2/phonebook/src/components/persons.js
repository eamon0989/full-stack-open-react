import { Name } from './name'

export const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map(person => <Name key={person.name} name={person.name} number={person.number} />)}
    </>
  )
} 