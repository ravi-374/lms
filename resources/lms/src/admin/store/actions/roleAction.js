import {roleActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';

export const fetchRoles = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get('roles')
        .then((response) => {
            dispatch({type: roleActionType.FETCH_ROLES, payload: response.data.data});
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addRole = (role) => async (dispatch) => {
    await apiConfig.post('roles', role)
        .then((response) => {
            dispatch({type: roleActionType.ADD_ROLE, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editRole = (roleId, role) => async (dispatch) => {
    await apiConfig.put(`roles/${roleId}`, role)
        .then((response) => {
            dispatch({type: roleActionType.EDIT_ROLE, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteRole = (roleId) => async (dispatch) => {
    await apiConfig.delete(`roles/${roleId}`)
        .then((response) => {
            dispatch({type: roleActionType.DELETE_ROLE, payload: roleId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
