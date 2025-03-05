import axios from "axios";

const getCountries = () => {
    const response = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return response.then(res => res.data);
}

export default {
    getCountries
}