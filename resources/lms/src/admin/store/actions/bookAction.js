import {bookActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';

export const fetchBooks = (filter = {}, history = null, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = 'books';
    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: bookActionType.FETCH_BOOKS, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({response}) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const fetchBook = (bookId, isLoading = true) => async (dispatch) => {
    dispatch(setLoading(isLoading));
    await apiConfig.get(`books/${bookId}`)
        .then((response) => {
            dispatch({type: bookActionType.FETCH_BOOK, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
            dispatch(setLoading(false));
        });
};

export const addBook = (book, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post('books', book)
        .then((response) => {
            dispatch({type: bookActionType.ADD_BOOK, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: response.data.message}));
            history.push('/app/admin/books');
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
            dispatch(setLoading(false));
        });
};

export const editBook = (bookId, book, history = null) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post(`books/${bookId}`, book)
        .then((response) => {
            dispatch({type: bookActionType.EDIT_BOOK, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: response.data.message}));
            if (history) {
                history.push('/app/admin/books');
            } else {
                dispatch(toggleModal());
            }
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
            dispatch(setLoading(false));
        });
};

export const deleteBook = (bookId) => async (dispatch) => {
    await apiConfig.delete(`books/${bookId}`)
        .then((response) => {
            dispatch({type: bookActionType.DELETE_BOOK, payload: bookId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
