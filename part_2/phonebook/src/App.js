import React, { useState, useEffect } from 'react'
import { Search } from './components/search'
import { Form } from './components/form'
import { Persons } from './components/persons'
import personService from './services/phonebook'
import { Notification } from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }

  useEffect(hook, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ message, setMessage ] = useState(null)

  const addPerson = (event) => {
    event.preventDefault();
    let oldPerson;

    if (persons.find(person => {
      if (person.name === newName) {
        oldPerson = person;
      }

      return person.name === newName
    })) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let newPerson = { ...oldPerson, number: newNumber };
        personService.update(oldPerson.id, newPerson)
          .then(_ => {
            setPersons([...persons.filter(person => person.id !== oldPerson.id), newPerson])
            setMessage(`${newPerson.name}'s number has been changed!`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(error => {
            setMessage(`${oldPerson.name} has already been removed from the server`)
            setTimeout(() => setMessage(null), 5000)
          })
      }
    } else {
      let personObject = {
        name: newName,
        number: newNumber,
      }

      personService.create(personObject)
        .then(response => {
          console.log(response);
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setTimeout(() => setMessage(null), 5000)
        })
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
      <Notification message={message}/>
      <Search value={newSearch} onChange={handleSearchChange} />
      <h2> </h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setPersons={setPersons} setMessage={setMessage} persons={persons} />
    </div>
  )
}

export default App