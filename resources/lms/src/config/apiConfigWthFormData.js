import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({

    baseURL: 'http://local.lms.com/api/',
    params: {
        token: token
    },
    headers: {'Content-Type': 'multipart/form-data'}
});
