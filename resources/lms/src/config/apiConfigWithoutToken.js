import axios from 'axios';
import axiosInterceptor from './axiosInterceptor';

const wampServer = 'http://local.lms.com/api/';
const axiosApi = axios.create({
    baseURL: wampServer,
});

axiosInterceptor.setupInterceptors(axiosApi,true,false);

export default axiosApi;
