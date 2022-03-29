const axios = require('axios');

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000
})
export default client;