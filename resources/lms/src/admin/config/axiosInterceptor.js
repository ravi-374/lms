import {errorMessage} from '../../appConstant';
import {environment} from '../../environment';
import {Routes, Tokens} from "../../constants";

export default {
    setupInterceptors: (axios, isToken = false, isFormData = false) => {
        axios.interceptors.request.use(config => {
                if (isToken) {
                    return config;
                }
                let token = localStorage.getItem(Tokens.ADMIN);
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                } else {
                    window.location.href = environment.URL + '/#' + Routes.ADMIN_LOGIN;
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
            if (error.response.data.message === errorMessage.TOKEN_NOT_PROVIDED
                || error.response.data.message === errorMessage.TOKEN_INVALID
                || error.response.data.message === errorMessage.TOKEN_INVALID_SIGNATURE
                || error.response.data.message === errorMessage.TOKEN_EXPIRED) {
                window.location.href = environment.URL + '/#' + Routes.ADMIN_LOGIN;
                localStorage.removeItem(Tokens.ADMIN);
            }
            return Promise.reject({ ...error })
        };
        const successHandler = (response) => {
            return response;
        };

    }
};
