import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const response = axios.get(baseUrl);
    return response
        .then(response => response.data);
}

const create = (data) => {
    const response = axios.post(baseUrl, data);
    return response.then(response => response.data);
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default {
    getAll,
    create,
    deletePerson
}