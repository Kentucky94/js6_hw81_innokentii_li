const axios = require('axios');
const store = require('./store/configureStore');

const axiosOrders = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosOrders;