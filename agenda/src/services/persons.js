import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons';

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
    const response = axios.delete(`${baseUrl}/${id}`);
    return response.then(response => response.data);
}

const updatePhone = (id, data) => {
    const response = axios.put(`${baseUrl}/${id}`, data);
    return response.then(res => res.data);
}

export default {
    getAll,
    create,
    deletePerson,
    updatePhone
}