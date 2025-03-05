import { useState, useEffect } from 'react'
import countriesServices from './services/countries';

const App = () => {
  const [message, setMessage] = useState(null);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');


  useEffect(() => {
    if (searchCountry) {
      countriesServices
        .getCountries()
        .then(response => {
          const countriesFind = response.filter(c => {
            return c.name.common.toLowerCase().includes(searchCountry.toLowerCase())
          });      
          if(countriesFind.length > 10){
            setMessage('Too many matches, specify another filter')
            setCountries([])
          }else{
            setMessage(null)
            setCountries(countriesFind)
          }
          if(searchCountry.length === 1){
            setMessage(null)
            setCountries([])
          }          
        })
    }
  }, [searchCountry])

  const handleChange = (event) => {   
    setSearchCountry(event.target.value)
  }

  const selectCountry = (name) => {
    countriesServices
      .getCountry(name)
      .then(res => {
        countriesServices.getWeather(res.capitalInfo.latlng)
          .then(wea => {
            setWeather(wea);
          })
        setMessage(null)
        setCountries([])
        setCountry(res);
      })
  }

  return (
    <div>
      <form>
        Country: <input value={searchCountry} onChange={handleChange} />
      </form>
      <p>{message ?? message}</p>
      {
        countries.length > 1 && countries.length <= 10 
        ? countries.map(country => {
            return (
              <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={()=> selectCountry(country.name.common)}>Show</button>
              </div>              
            )
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
      { country === null 
          ? <p></p> 
          : <div>
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
                {weather && (
                  <>
                    <p>Temperature: {weather.main.temp} C</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
                    <p>Wind: {weather.wind.speed} m/s</p>
                  </>
                )}
            </div>
      }
    </div>
  )
}

export default App