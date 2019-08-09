import {userActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";

export const fetchUsers = (filter = {}) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = 'users';
    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({type: userActionType.FETCH_USERS, payload: response.data.data});
            dispatch(setTotalRecord(response.data.totalRecords));
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const fetchUser = (userId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`users/${userId}`)
        .then((response) => {
            dispatch({type: userActionType.FETCH_USER, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addUser = (user) => async (dispatch) => {
    await apiConfigWthFormData.post('users', user)
        .then((response) => {
            dispatch({type: userActionType.ADD_USER, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editUser = (userId, user) => async (dispatch) => {
    await apiConfigWthFormData.post(`users/${userId}`, user)
        .then((response) => {
            dispatch({type: userActionType.EDIT_USER, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteUser = (userId) => async (dispatch) => {
    await apiConfig.delete(`users/${userId}`)
        .then((response) => {
            dispatch({type: userActionType.DELETE_USER, payload: userId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const activeDeactiveUser = (userId) => async (dispatch) => {
    await apiConfigWthFormData.get(`users/${userId}/update-status`)
        .then((response) => {
            dispatch({type: userActionType.SET_ACTIVE_DE_ACTIVE, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
