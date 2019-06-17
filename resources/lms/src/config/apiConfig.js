import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: 'http://local.invoices-backend.com/api/',
    params: {
        token: token
    },
});