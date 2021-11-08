import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Country = ({ name }) => {
  return (
    <>
      <li>{name}</li>
    </>
  )
}

const SingleCountry = ({ country }) => {
  const displayCountry = country[0];

  return (
    <li>
      <h1>{displayCountry.name.common}</h1>
      <p>capital: {displayCountry.capital[0]}</p>
      <p>population: {displayCountry.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(displayCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img src={displayCountry.flags.png} alt='flag' />
    </li>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <ul>
        <li>Too many matches, specify another filter</li>
      </ul>
    )
  } else if (countries.length === 1) {
    return (
      <ul>
        <SingleCountry country={countries} />
      </ul>
    )
  } else {
    return (
      <ul>
        {countries.map(country => <Country key={country.name.common} name={country.name.common} /> )}
      </ul>
    )
  }
}

const Search = ({ updateSearch }) => {
  return (
    <>
      find countries: <input onChange={updateSearch} />
    </>
  )
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  const countriesToShow = showAll ? countries : countries
    .filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))

  const updateSearch = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
  }

  const hook = () => {
    axios 
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        const countries = res.data.sort((a, b) => {
         return a.name.common - b.name.common;
        })
        setCountries(countries) 
      })
  }

  useEffect(hook, [])
  return (
    <>
      <Search updateSearch={updateSearch} />
      <Countries countries={countriesToShow} />
    </>
  );
}

export default App;
