import {memberActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

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

export const addMember = (member) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post('members', member)
        .then((response) => {
            dispatch({type: memberActionType.ADD_MEMBER, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editMember = (memberId, member) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post(`members/${memberId}`, member)
        .then((response) => {
            dispatch({type: memberActionType.EDIT_MEMBER, payload: response.data.data});
            dispatch(setLoading(false));
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
