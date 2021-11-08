import axios from "axios";
import { useState, useEffect } from "react";
const api_key = process.env.REACT_APP_API_KEY

export const SingleCountry = (props) => {
  const displayCountry = props.country[0];
  const [ weather, setWeather ] = useState({})
  const capital = displayCountry.capital;


  const hook = () => {
    axios
    .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`)
    .then(res => setWeather(res.data))
  }

  useEffect(hook, [capital])

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