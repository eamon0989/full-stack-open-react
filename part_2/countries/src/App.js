import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country, showCountry }) => {
  return (
    <>
      <li>{country.name.common}<button onClick={showCountry}> show</button></li>
    </>
  )
}

const SingleCountry = (props) => {
  const displayCountry = props.country[0];
  const [ weather, setWeather ] = useState({})

  const hook = () => {
    const capital = displayCountry.capital;

    axios
    .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`)
    .then(res => setWeather(res.data))
  }

  useEffect(hook, [])

  if (weather?.current) {
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

        <h3>Weather in {weather.location.name}</h3>
        <p><b>temperature:</b> {weather.current.temp_c}</p>
        <img src={weather.current.condition.icon} alt='weather' />
        <p><b>wind:</b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
      </li>
    )
  } else {
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
}

const Countries = ({ countries, showCountry }) => {
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
        {countries.map(country => <Country key={country.name.common} country={country} showCountry={showCountry} /> )}
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
  )
}

export default App;
