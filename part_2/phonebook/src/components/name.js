import personService from '../services/phonebook'

export const Name = ({ name, number, id, setPersons, persons }) => {
  const deleteUser = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
      personService
        .deletePerson(event.target.id)
        .then(response => {
          if (response === 'OK') {
            setPersons(persons.filter(person => +person.id !== +event.target.id))
          }
        })
    }
  }

  return (
    <>
      <p>{name} {number}<button name={name} id={id} onClick={deleteUser}>Delete</button></p>
    </>
  )
}