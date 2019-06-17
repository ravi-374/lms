import axios from 'axios';

export default axios.create({
    baseURL: 'http://local.invoices-backend.com/api/'
});