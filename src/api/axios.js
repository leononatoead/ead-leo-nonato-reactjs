import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.pagar.me/1/', timeout: 5000 });

export default api;
