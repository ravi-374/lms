import {bookAllotmentActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import {getApiRouteForBookAllotment, getBookAllotmentSuccessMessage} from "../../shared/sharedMethod";
import _ from 'lodash';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchBooksAllotment = (filter = {}) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = apiBaseURL.BOOK_HISTORY;

    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: bookAllotmentActionType.FETCH_BOOKS_ALLOTMENT, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const fetchBookAllotment = (bookAllotmentId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.ISSUED_BOOK + '/' + bookAllotmentId)
        .then((response) => {
            dispatch({ type: bookAllotmentActionType.FETCH_BOOK_ALLOTMENT, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const addBookAllotment = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.post(`${apiBaseURL.BOOK}/${book.book_item_id}/${getApiRouteForBookAllotment(book.status)}`, book)
        .then(() => {
            dispatch(fetchBooksAllotment(filterObj));
            dispatch(addToast({ text: getFormattedMessage(getBookAllotmentSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookAllotment = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.post(`${apiBaseURL.BOOK}/${book.book_item_id}/${getApiRouteForBookAllotment(book.status)}`, book)
        .then(() => {
            dispatch(fetchBooksAllotment(filterObj));
            dispatch(addToast({ text: getFormattedMessage(getBookAllotmentSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookAllotmentStatus = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.put(`${apiBaseURL.BOOK}/${book.book_item_id}/update-issued-book-status`, { status: book.status })
        .then(() => {
            dispatch(fetchBooksAllotment(filterObj));
            dispatch(addToast({ text: getFormattedMessage(getBookAllotmentSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteBookAllotment = (bookId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.BOOK_HISTORY + '/' + bookId)
        .then((response) => {
            dispatch({ type: bookAllotmentActionType.DELETE_BOOK_ALLOTMENT, payload: bookId });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
