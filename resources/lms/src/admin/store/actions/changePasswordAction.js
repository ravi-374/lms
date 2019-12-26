import {toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const onChangePassword = (passwords) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.CHANGE_PASSWORD, passwords)
        .then((response) => {
            dispatch(addToast({ text: getFormattedMessage('change-password.success.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
