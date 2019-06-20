import axios from 'axios';

const token = localStorage.getItem('token');
const jsonServer = 'http://localhost:3000/';
const wampServer ='http://local.lms.com/api/v1/';
export default axios.create({
    baseURL: wampServer,
    params: {
        token: token
    },
});
