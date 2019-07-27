import {tagActionType} from '../../constants';
import apiConfig from '../../../config/apiConfig';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchTags = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('tags')
        .then((response) => {
            dispatch({type: tagActionType.FETCH_TAGS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addTag = (tag) => async (dispatch) => {
    await apiConfig.post('tags', tag)
        .then((response) => {
            dispatch({type: tagActionType.ADD_TAG, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editTag = (tagId, tag) => async (dispatch) => {
    await apiConfig.put(`tags/${tagId}`, tag)
        .then((response) => {
            dispatch({type: tagActionType.EDIT_TAG, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteTag = (tagId) => async (dispatch) => {
    await apiConfig.delete(`tags/${tagId}`)
        .then((response) => {
            dispatch({type: tagActionType.DELETE_TAG, payload: tagId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
