import axios from 'axios';

const jsonServer = 'http://localhost:3000/';

export default axios.create({
    baseURL: jsonServer,
});
