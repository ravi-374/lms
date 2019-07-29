import {memberActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';

export const fetchMembers = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('members')
        .then((response) => {
            dispatch({type: memberActionType.FETCH_MEMBERS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const fetchMember = (memberId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`members/${memberId}`)
        .then((response) => {
            dispatch({type: memberActionType.FETCH_MEMBER, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addMember = (member) => async (dispatch) => {
    await apiConfigWthFormData.post('members', member)
        .then((response) => {
            dispatch({type: memberActionType.ADD_MEMBER, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editMember = (memberId, member) => async (dispatch) => {
    await apiConfigWthFormData.post(`members/${memberId}`, member)
        .then((response) => {
            dispatch({type: memberActionType.EDIT_MEMBER, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteMember = (memberId) => async (dispatch) => {
    await apiConfig.delete(`members/${memberId}`)
        .then((response) => {
            dispatch({type: memberActionType.DELETE_MEMBER, payload: memberId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
