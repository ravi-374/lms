import axios from 'axios';

export default axios.create({
    baseURL: 'http://local.lms.com/api/'
});
