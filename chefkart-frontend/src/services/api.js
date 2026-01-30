import axios from 'axios';

const api = axios.create({
    baseURL: 'https://chefkart-fullstack-03.onrender.com/api/v1',
    withCredentials: true
});

export default api;
