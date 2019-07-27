import {errorMessage} from '../appConstant';
import {environment} from '../envieroment';

export default {
    setupInterceptors: (axios, isToken = false, isFormData = false) => {
        axios.interceptors.request.use(config => {
                if (isToken) {
                    return config;
                }
                let token = localStorage.getItem('authtoken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                } else {
                    window.location.href = environment.URL + '/#/app/admin/login';
                }
                if (isFormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            response => successHandler(response),
            error => errorHandler(error)
        );
        const errorHandler = (error) => {
            if (error.response.data.message === errorMessage.TOKEN_NOT_PROVIDED || error.response.data.message === errorMessage.TOKEN_EXPIRED) {
                window.location.href = environment.URL + '/#/app/admin/login';
                localStorage.removeItem('authtoken');
            }
            return Promise.reject({ ...error })
        };
        const successHandler = (response) => {
            return response;
        };

    }
};
