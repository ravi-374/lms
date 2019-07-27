import {constants} from '../../constants';
import toastConfig from '../../config/toastConfig';

export const addToast = (options = {}) => {
    return { type: constants.ADD_TOAST, payload: toastConfig(options) };
};

export const removeToast = (id) => {
    return { type: constants.REMOVE_TOAST, payload: id };
};
