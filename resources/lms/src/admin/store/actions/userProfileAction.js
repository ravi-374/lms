import {userProfileActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../constants';
import {setUserProfile, clearUserProfile} from "../../../store/action/localStorageAction";
import {LocalStorageKey} from "../../../constants";

export const fetchUserProfile = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`user-details`)
        .then((response) => {
            dispatch({ type: userProfileActionType.FETCH_USER_PROFILE, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const editUserProfile = (user, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post(`update-user-profile`, user)
        .then((response) => {
            dispatch({ type: userProfileActionType.EDIT_USER_PROFILE, payload: response.data.data });
            dispatch(addToast({ text: response.data.message }));
            dispatch(setUserProfile(LocalStorageKey.USER, response.data.data));
            dispatch(setLoading(false));
            history.goBack();
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};
