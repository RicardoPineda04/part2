import axios from "axios";

const getCountries = () => {
    const response = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return response.then(res => res.data);
}

const getCountry = (name) => {
    const response = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
    return response.then(res => res.data);
}

const getWeather = (latlon) => {    
    const apiKey = import.meta.env.VITE_API_OPENWEATHER;
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latlon[0]}&lon=${latlon[1]}&appid=${apiKey}`);
    return response.then(res => res.data)
}

export default {
    getCountries,
    getCountry,
    getWeather
}