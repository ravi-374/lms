import {bookCirculationActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import {getApiRouteForBookCirculation, getBookCirculationSuccessMessage} from "../../shared/sharedMethod";
import _ from 'lodash';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchBooksCirculation = (filter = {}) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = apiBaseURL.BOOK_HISTORY;

    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: bookCirculationActionType.FETCH_BOOKS_CIRCULATION, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const fetchBookCirculation = (bookCirculationId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.ISSUED_BOOK + '/' + bookCirculationId)
        .then((response) => {
            dispatch({ type: bookCirculationActionType.FETCH_BOOK_CIRCULATION, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const addBookCirculation = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.post(`${apiBaseURL.BOOK}/${book.book_item_id}/${getApiRouteForBookCirculation(book.status)}`, book)
        .then(() => {
            dispatch(fetchBooksCirculation(filterObj));
            dispatch(addToast({ text: getFormattedMessage(getBookCirculationSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookCirculation = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.post(`${apiBaseURL.BOOK}/${book.book_item_id}/${getApiRouteForBookCirculation(book.status)}`, book)
        .then(() => {
            dispatch(fetchBooksCirculation(filterObj));
            dispatch(addToast({ text: getFormattedMessage(getBookCirculationSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookCirculationStatus = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.put(`${apiBaseURL.BOOK}/${book.book_item_id}/update-issued-book-status`, { status: book.status })
        .then(() => {
            dispatch(fetchBooksCirculation(filterObj));
            dispatch(addToast({ text: getFormattedMessage(getBookCirculationSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteBookCirculation = (bookId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.BOOK_HISTORY + '/' + bookId)
        .then((response) => {
            dispatch({ type: bookCirculationActionType.DELETE_BOOK_CIRCULATION, payload: bookId });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};