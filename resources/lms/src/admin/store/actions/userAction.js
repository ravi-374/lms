import {userActionType} from '../../constants';
import apiConfig from '../../../config/apiConfig';
import apiConfigWthFormData from '../../../config/apiConfigWthFormData';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchUsers = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('users')
        .then((response) => {
            dispatch({type: userActionType.FETCH_USERS, payload: response.data.data});
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
