import {tagActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";

export const fetchTags = (filter) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = 'tags';

    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({type: tagActionType.FETCH_TAGS, payload: response.data.data});
            dispatch(setTotalRecord(response.data.totalRecords));
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
