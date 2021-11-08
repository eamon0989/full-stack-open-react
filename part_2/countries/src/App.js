import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Search } from './components/search';
import { SingleCountry } from './components/single_country';
import { Countries } from './components/countries';

function App() {
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  const countriesToShow = showAll ? countries : countries
    .filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))

  const updateSearch = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
    setCountry('');
  }

  const showCountry = (event) => {
    let country = countries.filter(country => country.name.common === event.target.id)
    setCountry(country)
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
      {country ? 
        <SingleCountry country={country} />
        : <Countries countries={countriesToShow} showCountry={showCountry} />
      }
    </>
  )
}

export default App;
