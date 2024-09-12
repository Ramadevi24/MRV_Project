import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;