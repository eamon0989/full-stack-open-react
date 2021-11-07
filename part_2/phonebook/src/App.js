import React, { useState } from 'react'
import { Search } from './components/search'
import { Form } from './components/form'
import { Persons } from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      let personObject = {
        name: newName,
        number: newNumber,
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    if (event.target.value?.length > 0) {
      setNewSearch(event.target.value);
      setShowAll(false)
    } else {
      setNewSearch(event.target.value);
      setShowAll(true)
    }
  }

  const personsToShow = showAll ? persons : 
  persons.filter(person => {
    return person.name.toLowerCase().startsWith(newSearch.toLowerCase());
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={newSearch} onChange={handleSearchChange} />
      <h2> </h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App