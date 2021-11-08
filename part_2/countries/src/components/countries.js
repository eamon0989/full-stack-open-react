import { SingleCountry } from "./single_country"

const Country = ({ country, showCountry }) => {
  return (
    <>
      <li>{country.name.common}<button onClick={showCountry} id={country.name.common} > show</button></li>
    </>
  )
}

export const Countries = ({ countries, showCountry }) => {
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