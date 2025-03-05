import { useState, useEffect } from 'react'
import countriesServices from './services/countries';

const App = () => {
  const [message, setMessage] = useState(null);
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (country) {
      countriesServices
        .getCountries()
        .then(response => {
          const countriesFind = response.filter(c => {
            return c.name.common.toLowerCase().includes(country.toLowerCase())
          });      
          if(countriesFind.length > 10){
            setMessage('Too many matches, specify another filter')
            setCountries([])
          }else{
            setMessage(null)
            setCountries(countriesFind)
          }
          if(country.length == 1){
            setMessage(null)
            setCountries([])
          }          
        })
    }
  }, [country])

  const handleChange = (event) => {   
    setCountry(event.target.value)
  }

  return (
    <div>
      <form>
        Country: <input value={country} onChange={handleChange} />
      </form>
      <p>{message ?? message}</p>
      {
        countries.length > 1 && countries.length <= 10 
        ? countries.map(country => {
            return <p key={country.name.common}>{country.name.common}</p>
          })
        : countries.map(country => {
          return (
            <div key={country.name.common}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area}</p>
              <h2>Languages</h2>
              <ul>
                {
                  Object.entries(country.languages).map(([key, value])=> {
                    return <li key={key}>{value}</li>
                  })
                }
              </ul>
              <img src={country.flags.png} alt={country.name.common} />
            </div>
          )
        })
      }
    </div>
  )
}

export default App