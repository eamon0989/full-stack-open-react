import { Name } from './name'

export const Persons = ({ personsToShow, setPersons, persons }) => {
  return (
    <>
      {personsToShow.map(person => <Name key={person.name} persons={persons} setPersons={setPersons} id={person.id} name={person.name} number={person.number} />)}
    </>
  )
} 