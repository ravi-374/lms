import axios from 'axios';
import axiosInterceptor from './axiosInterceptor';
import {environment} from '../../envieroment';

const serverUrl = environment.URL + '/api/v1/';
const axiosApi = axios.create({
    baseURL: serverUrl,
});
axiosInterceptor.setupInterceptors(axiosApi, false, true);
export default axiosApi;
