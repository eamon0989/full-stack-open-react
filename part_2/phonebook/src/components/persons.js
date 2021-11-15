import { Name } from './name'

export const Persons = ({ personsToShow, setPersons, persons, setMessage }) => {
  return (
    <>
      {personsToShow.map(person => <Name key={person.name} persons={persons} setMessage={setMessage} setPersons={setPersons} id={person.id} name={person.name} number={person.number} />)}
    </>
  )
} 