import axios from 'axios';

export default axios.create({
  // baseURL: 'https://rest-api.da4.com.br',
  baseURL: process.env.REACT_APP_BASE_URL,
});
