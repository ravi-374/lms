import {authActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfigWithoutToken';
import apiConfigWithRoot from '../../config/apiConfigwithoutTokenWithRoot';
import {addToast} from '../../../store/action/toastAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL, LocalStorageKey, Routes, Tokens} from "../../../constants";
import {setUserProfile} from "../../../store/action/localStorageAction";
import {getLocalStorageDataByKey} from "../../../shared/sharedMethod";

export const login = (user, history) => async (dispatch) => {
    const { email, password } = user;
    await apiConfig.post(apiBaseURL.USER_LOGIN, { email, password })
        .then((response) => {
            if (user.remember_me) {
                localStorage.setItem('currentUser', btoa(JSON.stringify(user)));
            } else {
                if (getLocalStorageDataByKey('currentUser')) {
                    localStorage.removeItem('currentUser');
                }
            }
            localStorage.setItem(Tokens.ADMIN, response.data.data.token);
            dispatch(setUserProfile(LocalStorageKey.USER, response.data.data.user));
            if (sessionStorage.getItem('prevAdminPrevUrl')) {
                window.location.href = sessionStorage.getItem('prevAdminPrevUrl');
            } else {
                history.push(Routes.ADMIN_DEFAULT);
            }
            dispatch({ type: authActionType.LOGIN, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('login.success.logged.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const forgotPassword = (user) => async (dispatch) => {
    await apiConfigWithRoot.post(apiBaseURL.FORGOT_PASSWORD, user)
        .then(() => {
            dispatch({ type: authActionType.FORGOT_PASSWORD, payload: true });
            dispatch(addToast({ text: getFormattedMessage('forgot-password.success.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const resetPassword = (user, history) => async (dispatch) => {
    await apiConfigWithRoot.post(apiBaseURL.RESET_PASSWORD, user)
        .then(() => {
            dispatch({ type: authActionType.RESET_PASSWORD, payload: user });
            dispatch(addToast({ text: getFormattedMessage('reset-password.success.message') }));
            history.push(Routes.ADMIN_LOGIN);
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
