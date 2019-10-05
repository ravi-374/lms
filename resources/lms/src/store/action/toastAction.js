import React from 'react';
import {constants} from '../../constants';
import toastConfig from '../../config/toastConfig';
import {toast} from "react-toastify";
import ToastCard from '../../shared/toast/ToastCard';
import {toastType} from "../../admin/constants";

const notify = (options, toastsConfig) => {
    toastsConfig.config.toastId = toastsConfig.id;
    switch (options.type) {
        case toastType.ERROR :
            return toast.error(<ToastCard {...options}/>, toastsConfig.config);
        default:
            return toast.success(<ToastCard {...options}/>, toastsConfig.config);
    }
};

export const addToast = (options = {}) => {
    const toastsConfig = toastConfig(options);
    notify(options, toastsConfig);
    return { type: constants.ADD_TOAST, payload: toastsConfig };
};

export const removeToast = (id) => {
    return { type: constants.REMOVE_TOAST, payload: id };
};
