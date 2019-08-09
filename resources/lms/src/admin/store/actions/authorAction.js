import {authorActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";

export const fetchAuthors = (filter = {}) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = 'authors';
    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: authorActionType.FETCH_AUTHORS, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};

export const addAuthor = (author) => async (dispatch) => {
    await apiConfig.post('authors', author)
        .then((response) => {
            dispatch({ type: authorActionType.ADD_AUTHOR, payload: response.data.data });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};

export const editAuthor = (authorId, author) => async (dispatch) => {
    await apiConfig.put(`authors/${authorId}`, author)
        .then((response) => {
            dispatch({ type: authorActionType.EDIT_AUTHOR, payload: response.data.data });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};

export const deleteAuthor = (authorId) => async (dispatch) => {
    await apiConfig.delete(`authors/${authorId}`)
        .then((response) => {
            dispatch({ type: authorActionType.DELETE_AUTHOR, payload: authorId });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};
